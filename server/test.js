import { buyCodi, getBalance } from "./blockchain/codiService.js";
import dotenv from "dotenv";

dotenv.config();

const testSend = async () => {
    try {
        const recipient = "0x6B923461485681E8ff914cBcb9073f24A435C236"; // Replace with a valid testnet address
        const amount = 1; // CODI to send

        console.log(`🎯 Sending ${amount} CODI to ${recipient}...`);

        const beforeBalance = await getBalance(recipient);
        console.log(`📊 Balance before: ${beforeBalance} CODI`);

        const tx = await buyCodi(recipient, amount);
        if (!tx) throw new Error("Transaction failed");

        console.log(`✅ Transaction sent! TX Hash: ${tx.transactionHash || tx.hash || "Unknown"}`);

        const afterBalance = await getBalance(recipient);
        console.log(`📊 Balance after: ${afterBalance} CODI`);
    } catch (err) {
        console.error("❌ Test failed:", err.message || err);
    }
};

testSend();
