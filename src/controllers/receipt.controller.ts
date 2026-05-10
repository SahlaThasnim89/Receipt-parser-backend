import { RequestHandler } from "express";
import db from "../db/index"

export const uploadReceipt: RequestHandler = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        console.log(req.file)
        const receiptData = {
            filename: req.file.filename,
            path: req.file.path,
            mimetype: req.file.mimetype,
        };

        return res.status(200).json({
            message: "Receipt uploaded successfully",
            data: receiptData,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server error" });
    }
};


export const saveReceiptData: RequestHandler = (req, res) => {
    try {
        const { merchant, date, total, items, image_path } = req.body
        const stmt = db.prepare(`
            INSERT INTO receipts(
            merchant,
            date,total,
            items,image_path) VALUES (?,?,?,?,?)`);

        const result = stmt.run(
            merchant,
            date,
            total,
            JSON.stringify(items),
            image_path
        );

        return res.status(201).json({
            success: true,
            receipt_data:result,
            receipt_id: result.lastInsertRowid
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Failed to save receipt"
        });
    }
};


export const getReceipts: RequestHandler = (_req, res) => {
    try {
        const stmt = db.prepare(`
            SELECT * FROM receipts ORDER BY created_at DESC`)

        const receipts = stmt.all()
        const parsed = receipts.map((receipt: any) => ({
            ...receipt,
            items: JSON.parse(receipt.items)
        }))
        res.json(parsed)

    } catch (error) {
        res.status(500).json({
            success: false
        });
    }
}


