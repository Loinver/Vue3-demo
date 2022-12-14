/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2022-01-10 16:44:06
 * @LastEditors: Linyer
 * @LastEditTime: 2022-08-09 17:10:02
 */
import { defineConfig, UserConfigExport, ConfigEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

/**
 * 根据环境变量设置输出目录
 * @param mode 环境变量
 * @returns
 */
function handleOutDirByMode(mode) {
  console.log('环境', mode, import.meta)
  return 'dist'
}

// https://vitejs.dev/config/
export default ({ mode, command } = ConfigEnv) => {
  const isBuild = command === 'build'
  return defineConfig({
    base: './',
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        },
        {
          find: 'components',
          replacement: path.resolve(__dirname, 'src/components')
        },
        {
          find: 'apis',
          replacement: path.resolve(__dirname, 'src/apis')
        },
        {
          find: 'assets',
          replacement: path.resolve(__dirname, 'src/assets')
        }
      ]
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    css: {
      postcss: {
        plugins: [require('autoprefixer')]
      }
    },
    server: {
      host: '0.0.0.0',
      proxy: {
        // 字符串简写写法
        '/foo': 'http://localhost:4567',
        // 选项写法
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        // 正则表达式写法
        '^/fallback/.*': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fallback/, '')
        }
      }
    },
    optimizeDeps: {
      include: []
    },
    build: {
      sourcemap: true,
      outDir: handleOutDirByMode(mode),
      cssCodeSplit: true, // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。禁用 CSS 代码拆分,将整个项目中的所有 CSS 将被提取到一个 CSS 文件中
      brotliSize: false, // 关闭打包计算
      target: 'esnext', // 即假设有原生动态导入支持，并且将会转译得尽可能小
      //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
      assetsInlineLimit: 4096,
      assetsDir: 'static/img/', // 静态资源目录
      // rollup 打包配置
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  })
}
