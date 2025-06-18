/// <reference path="../types/fastify-jwt.d.ts" />
import { FastifyRequest, FastifyReply } from 'fastify';

console.log("🛡️ Auth middleware loaded!");
let itwasasocket : boolean = false;

// JWT verification using authMiddleware
export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {

    itwasasocket = false;
    console.log("🔍 Incoming request URL:", req.url);
    console.log("🔍 jwtVerify type in middleware:", typeof req.jwtVerify);
    console.log("🔍🔍🔍 All keys on req:", Object.keys(req));

    console.log('🔍 Full headers before jwtVerify:', req.headers);
    console.log('🔍 Authorization Header outside try:', String(req.headers['authorization']));


    // if requested URL is public, skip auth
    const publicPaths = ['/api/signup', '/api/login', '/api/public'];
    if (publicPaths.some(path => req.url?.startsWith(path))) return;

    try {
//        if (req?.headers['sec-websocket-protocol'] !== null) {
        if (req.headers.upgrade === 'websocket') {
          itwasasocket = true;
        }
        if (req.headers.upgrade === 'websocket' && !req.headers['authorization'] && req?.headers['sec-websocket-protocol']) {
          req.headers['authorization'] = "Bearer " + req.headers['sec-websocket-protocol'];
          delete req.headers['sec-websocket-protocol'];
        }
       
        console.log('🔍 Raw Authorization Header inside try00:', String(req.headers['authorization']));
        if (!req.headers['authorization'] || 
            (req.headers['authorization'] === "Bearer undefined" && req.headers['use-me-to-authorize'])) {
//            req.headers['authorization'] = req.headers['use-me-to-authorize'];
//            delete req.headers['use-me-to-authorize'];
            if (req.headers['use-me-to-authorize']) {
                req.headers['authorization'] = `Bearer ${req.headers['use-me-to-authorize'].replace(/^Bearer\s*/, '')}`;
                delete req.headers['use-me-to-authorize'];
            }
        }
        console.log('🔍 Raw Authorization Header inside try:', String(req.headers['authorization']));
        console.log('🔍 JWT Secret in use:', process.env.JWT_SECRET);

        await req.jwtVerify(); //verfication by secret automatically
        console.log('✅ JWT verified, user:', req.user);
//        console.log('req.url was:', req.url);

        //inject user ID or username into headers (for downstream services)
        const userId = (req.user as any)?.userId;
        if (userId) {
            req.headers['x-user-id'] = String(userId);
            console.log(`📦 Injected x-user-id = ${userId} into headers`);
//            console.log(req.headers);
            if (itwasasocket) {
//              console.log("it was a socket! huh");
              // since the goddamned socket connection ejetcs the headers it doesn't want down the line, do the manual check here with the help of the url params
              if (req?.url.substring(req.url.search("uuid=") + 5) !== userId) {
//                console.log(req?.url.substring(req.url.search("uuid=") + 5));
                throw "uuid mismatch";
              }
            }
        }
    } catch (err: any) {
        console.error('❌ JWT verification failed:', err.message);
        reply.code(401).send({ error: 'Unauthorized' });
        return;
    }
    console.log('✅ Auth middleware triggered!');
};
