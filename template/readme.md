
## 概况

此文档仅记录相关创建Template过程中所遇到的一些问题<br>

 
[使用说明](../README.md)  

- 此文档仅记录

## Webpack文档
https://webpack.js.org/concepts/


## 问题汇总


### npm run dev时，出现大小写的警告
现象：
``` 
There are multiple modules with names that only differ in casing.
This can lead to unexpected behavior when compiling on a filesystem with other case-semantic.
Use equal casing. Compare these module identifiers:
* E:\XDEV\mwt-aio\template-mobile\node_modules\_webpack@3.12.0@webpack\buildin\global.js
    Used by 3 module(s), i. e.
    E:\XDEV\mwt-aio\template-mobile\node_modules\_webpack-dev-server@2.11.3@webpack-dev-server\node_modules\sockjs-client\dist\sockjs.js
* E:\xdev\mwt-aio\template-mobile\node_modules\_webpack@3.12.0@webpack\buildin\global.js
    Used by 1 module(s), i. e.
    E:\xdev\mwt-aio\template-mobile\node_modules\_punycode@1.4.1@punycode\punycode.js
```
原因：路径中存在大写【E:\XDEV\mwt-aio】与【E:\xdev\mwt-aio】
解决：删除node_modules，重新安装

### import路径中能否使用变量

webpack 编译es6 动态引入 import() 时不能传入变量，
- 不能这样：var dir =’path/to/my/file.js’ ； import(dir) , 
- 只能这样：import(‘path/to/my/file.js’)
这是因为webpack的现在的实现方式不能实现完全动态，如果一定要用变量的时候，可以通过字符串模板来提供部分信息给webpack；例如import(./path/${myFile}), 这样编译时会编译所有./path下的模块，但运行时确定myFile的值才会加载，从而实现懒加载。


### Build failed with errors.

现象：对于编译期的错误，【npm run dev】后立即输出错误，但在【npm run build】的时候并没有给出明确错误信息。<br>
解决：修改/build/build.js文件，增加输出错误的代码
``` js
if (stats.stats) {
  for (let esi = 0; esi < stats.stats.length; esi++) {
    let es = stats.stats[esi];
    if (es.compilation) {
      console.log(es.compilation.errors)
    }
  }
}
```

### 离线运行：net::ERR_FILE_NOT_FOUND

npm run build编译出来的文件，如果直接双击运行，可能会报以下错误

```
GET file:///E:/static/js/template.f0a379aa407c927daf0f.js net::ERR_FILE_NOT_FOUND
```
解决：修改/config/index.js文件，【'/'】改为【'./'】
``` js
  build: {
    assetsPublicPath: './',
  }
```



### 离线运行：调用接口出错
现象：npm run build编译出来的文件，如果直接双击运行，可能会报以下错误
```
Failed to load file:///E:/mall/member/is-signin: Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, weapp, https.

response error!

```


### Import的两种实现
import可以有两种实现
- A：_import_development：module.exports = file => require('@/template/views' + file + '').default
- B：_import_production：module.exports = file => () => import('@/template/views' + file + '')

区别：
- 打包：A实现是将所有内容打包成一个文件，B实现是将所有内容按一定内定规则处分包处理
- 访问：A实现导致首次访问时，一次性下载所有内容，B实现首次访问时，按需分包下载
划分AB两种方式是参考其他admin的工程时引入的，开发环境是首次全部下载，生产环境是按需下载<br>
目前Admin的开发环境在首次访问时也极度缓慢，建议：无论是Admin还是Mobile工程都采用B实现，主要考虑因素如下：<br>
- 加快首次访问速度
- 统一开发环境与生产环境的行为


### 工程定义
各种工程的定义
- VSC工程，不严格定义，VSC打开一个文件夹，就算是一个VSC工程
- Webpack工程，一套webpack配置覆盖范围的内容，就是一个webpack工程
- Vue工程，一个Vue实例覆盖范围的内容，就是一个Vue工程
- Yog工程，由Node+Fis+Yog技术栈管理的工程，目前特指Member/Merchant/Mall/Platform



### 重命名Vue工程

如果能够保证Vue工程内使用相对路径，可以修改文件夹名字，重新启动即可<br>

如果不能保证，刚需要按以下步骤处理
- 重命名/src/template文件夹为template2
- 按过滤条件【src/template2/**/*.*】，全局搜索【@/template】，区分大小写+全字匹配，搜索，然后替换为【@/template2】

备注：建议统一使用相对路径

### 扩展多个Vue工程
在同一个Webpack工程内管理多个Vue工程<br>

如果能够保证Vue工程内所有路径都使用相对路径，那么可以直接复制Vue工程，重命名，重新启动即可<br>

如果不能保证，刚需要按以下步骤处理 
- 复制/src/template文件夹，并命名为template2
- 按过滤条件【src/template2/**/*.*】，全局搜索【@/template】，区分大小写+全字匹配，搜索，然后替换为【@/template2】 
备注A：建议统一使用相对路径
备注B：Vue工程的划分，要尽量避免用户在Vue工程之间相互跳转



### 多VSC工程搜索的问题

搜索过滤器，只会匹配工程内的文件和文件夹，如果过滤条件（include/exclude）中加入了工程文件名，会搜索不出来
- 不能这样：template-mobile/src/**/*.vue
- 应该这样：src/**/*.vue



### 多Vue工程的发布优化

假设两个Vue工程template1各template2，npm run build之后，将结果编译到dist文件夹<br>

#### mwt-fe-aio/mobile的dist文件夹结构如下
- ./dist/views/template1.html
- ./dist/views/template2.html
- ./dist/static/fonts/*
- ./dist/static/images/*
- ./dist/static/css/*
- ./dist/static/css/template1.css
- ./dist/static/css/template2.css
- ./dist/static/js/*
- ./dist/static/js/template1.js
- ./dist/static/js/template2.js 
- ./static文件夹的内容，复制到./dist/static文件夹下

思考：
- 两个Vue工程生成的文件是混在一起，没有明显划分<br>


#### 考虑另外一种输出结构

dist文件夹结构如下

template1工程
- ./dist/template1/index.html
- ./dist/template1/static/css/*
- ./dist/template1/static/fonts/*
- ./dist/template1/static/images/*
- ./dist/template1/static/js/* 

template2工程
- ./dist/template2/index.html
- ./dist/template2/static/css/*
- ./dist/template2/static/fonts/*
- ./dist/template2/static/images/*
- ./dist/template2/static/js/* 

static文件夹
- 复制到./dist/static，被template1与template2共用

思考：
- 两个Vue工程生成的文件独立<br>
- 两个Vue工程大部分文件都是独立的，除了static文件<br>
- 如果如果两个Vue工程使用了相同的js，会单独打包到各自的文件夹，增加体积，保证了独立，但增加了体积

如果static中的内容仅仅是某个工程独立使用，建议在各工程内增加static文件夹
建议：建立二级static，Vue工程独立static + 多工程共享static


相关的改动：
- 主要是调整了webpack的配置（webpack.base.conf.js、webpack.dev.conf.js、webpack.prod.conf.js）
- 支持多工程
- build结果的文件夹调整


### 与第三方样式的冲突

比如：vant会改写body的margin样式：【margin:0】，工程样式【body{margin:0 auto}】并不会生效

- 第三方插件可能会改写html/body标签的属性, 可以使用[.html/.body]来强制使用自己的样式
- require的时候就不会冲突，import的时候就会冲突???


### 单独run/build某个Vue工程或者工程组

支持以下命令
- npm run dev                  // 运行所有的Vue工程
- npm run dev:template         // 运行指定Vue工程：template
- npm run dev:template2        // 运行指定Vue工程：template2
- npm run dev:group            // 运行指定Vue工程组：template, template2

- npm run build                // 编译打包所有的Vue工程
- npm run build:template       // 编译打包指定Vue工程：template
- npm run build:template2      // 编译打包指定Vue工程：template2
- npm run build:group          // 编译打包指定Vue工程组：template, template2


### 验证二级static生效

- 图片资源，如果已经import，不需要CopyWebpackPlugin也能正常显示，没有import的还是需要使用CopyWebpackPlugin
- import的时候，使用工程内的路径
- img标签，应该使用工程路径
- a标签，应该使用发布路径，可能依赖是否有对应的loader



### 加深发布路径

生成环境：修改assetsRoot
``` js
  build: {
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist/mobile'),
  }
```
开发环境：一般要同时修改assetsPublicPath和openPage
``` js
  dev: {
    assetsPublicPath: '/mobile',
    openPage: `mobile/${Object.keys(entries)[0]}/index.html`,
  }
```

注：config.dev.assetsPublicPath与config.dev.assetsPublicPath的含义完全不一样

### 运行生产环境

增加app文件夹


### 加载svg

有三个地方可以存放svg文件：
- A：/src/template/icons/svg
- B：/library/ui/icons/svg
- C：common-layer/ui/icons/svg

默认是加载BC两个地方的svg，如果需要加载A地方的svg，需要按以下步骤处理：
- /src/icons/index.js中增加：requireAll(require.context( "./svg" , false, /\.svg$/)) 
- /build/webpack.base.conf.js中[module]>[rules]>[test: /\.svg$/]: 增加：resolve('src/[template]/icons/svg') 



### 创建vue init的模板

参考文档：https://github.com/dwqs/blog/issues/56<br>

参考官方模板：https://github.com/vuejs-templates/webpack
生成自己的模板：https://github.com/xlxwhy/vue-template-mobile.git

注：vue-cli不运行私服，只运行Github等线上平台


### 开发环境与生产环境不一致的情况

待确定



