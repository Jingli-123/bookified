// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// // 1. 定义哪些路由是公共的（不需要登录就能访问）
// // 比如登录页、注册页、首页
// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']);

// export default clerkMiddleware(async (auth, req) => {
//   // 2. 如果不是公共路由，则强制检查身份验证
//   if (!isPublicRoute(req)) {
//     await auth.protect();
//   }
// });

// export const config = {
//   matcher: [
//     // 3. 这里的正则表达式确保了中间件运行在所有请求上，
//     // 同时过滤掉静态文件（如图片、图标等），以提高性能。
//     // 特别是最后一行 /(api|trpc)(.*) 确保了你的文件上传接口能被处理。
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     '/(api|trpc)(.*)',
//   ],
// };
// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/sign-in(.*)",
//   "/sign-up(.*)",
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   if (!isPublicRoute(req)) {
//     await auth.protect();
//   }
// });

// export const config = {
//   matcher: [
//     "/((?!_next|.*\\..*).*)",
//     "/(api|trpc)(.*)",
//   ],
// };
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
    "/__clerk/(.*)",
  ],
};