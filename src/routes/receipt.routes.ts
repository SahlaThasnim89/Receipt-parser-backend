import { Router } from "express";
import { upload } from "../multer";
import {uploadReceipt,saveReceiptData,getReceipts} from "../controllers/receipt.controller"

const router=Router()

router.post('/upload-receipt', upload.single('receipt'), uploadReceipt)
router.post('/save-receipt',saveReceiptData)
router.get("/receipts",getReceipts)

export default router
