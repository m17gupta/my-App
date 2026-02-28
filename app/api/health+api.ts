
import dbConnect from '@/utils/dbConnect';
import mongoose from 'mongoose';

export async function GET() {
    try {
        await dbConnect();
        const state = mongoose.connection.readyState;
        const host = mongoose.connection.host;
        return Response.json({ status: 'connected', readyState: state, host: host });
    } catch (error: any) {
        return Response.json({ status: 'error', error: error.message }, { status: 500 });
    }
}
