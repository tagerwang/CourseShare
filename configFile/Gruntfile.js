var uglifyConfig = [
    'js/plugin/jquery-1.12.3.min.js',
    'js/isLoginToken.js',
    'js/plugin/bootstrap.js',
    'js/plugin/jquery.cookie.js',
    'js/plugin/jquery-ui.min.js'
]
module.exports = function(grunt){

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
            	//可以给压缩文件首行添加注释
                banner: '/* last-uglify <%= grunt.template.today("yyyy-mm-dd") %> */\n', 
                mangle: false,
                ie8:true
            },
            biuldAll: {//任务四：合并压缩a.js和b.js
                files: {
                    'js/beforeCommon.min.js': uglifyConfig
                }
            }
        }
    });

    // 加载提供"uglify"任务的插件
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 默认任务
    grunt.registerTask('default', ['uglify:biuldAll']);
}