import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import { viteMockServe } from "vite-plugin-mock";
import viteCompression from "vite-plugin-compression";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import {
  createStyleImportPlugin,
  ElementPlusResolve,
} from "vite-plugin-style-import";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import Unocss from "unocss/vite";
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import ElementPlus from "unplugin-element-plus/vite";
export default defineConfig({
  base: "./", //打包路径
  plugins: [
    vue({
      // refTransform: true //开启ref转换 使用$ref
    }),
    // ElementPlus({
    //   useSource: true,
    // }),
    VueSetupExtend(), //jiejue setup无法添加name问题
    // gzip压缩 生产环境生成 .gz 文件
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: "gzip",
      ext: ".gz",
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
    }),
    viteMockServe({
      //Mock服务自动注册
      mockPath: "./src/mock",
      localEnabled: true,
      prodEnabled: true,
    }),
    // Unocss({
    //   presets: [
    //     presetUno(),
    //     presetAttributify(),
    //     presetIcons({
    //       scale: 1.2,
    //       warn: true,
    //     }),
    //   ],
    //   transformers: [transformerDirectives(), transformerVariantGroup()],
    // }),
    // Components({  //自动注册组件
    //   dts:true,
    //   resolvers: [ElementPlusResolver(
    //     {
    //       importStyle:'sass'
    //     }
    //   )],
    // }),
    // createStyleImportPlugin({  //自动导入框架样式
    //   resolves: [
    //     ElementPlusResolve(),
    //   ],
    //   // 自定义规则
    //   libs: [
    //     {
    //       libraryName: 'element-plus',
    //       esModule: true,
    //       resolveStyle: (name) => {
    //         return `element-plus/lib/theme-chalk/${name}.css`
    //       }
    //     }
    //   ]
    // })
  ],
  // 配置别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".ts", ".json", ".vue"], //导入文件省略后缀
  },
  //启动服务配置
  server: {
    open: true,
    https: false,
    strictPort: true,
    port: 3001,
    proxy: {
      // 选项写法
      // "/api": {
      //   target: "http://47.96.87.129:8002/",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
      // // 正则表达式写法
      // "^/fallback/.*": {
      //   target: "http://jsonplaceholder.typicode.com",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/fallback/, ""),
      // },
      // // 使用 proxy 实例
      // "/api1": {
      //   target: "http://jsonplaceholder.typicode.com",
      //   changeOrigin: true,
      //   configure: (proxy, options) => {
      //     // proxy 是 'http-proxy' 的实例
      //   },
      // },
    },
  },
  //css全局预处理器
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/assets/style/theme.scss" as *;',
      },
    },
    postcss: {
      plugins: [
        // 移除打包element时的@charset警告
        {
          postcssPlugin: "internal:charset-removal",
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === "charset") {
                atRule.remove();
              }
            },
          },
        },
      ],
    },
  },
  // 生产环境打包配置
  //去除 console debugger
  // build: {
  //   terserOptions: {
  //     compress: {
  //       drop_console: true,
  //       drop_debugger: true,
  //     },
  //   },
  // },
});
