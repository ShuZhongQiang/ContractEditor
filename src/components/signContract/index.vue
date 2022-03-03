<template>
    <div>
        <el-row>
            <el-col :span="5">
                <div class="editor-left">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item title="标签库" name="1">
                            <div class="flag-box">
                                <el-row>
                                    <el-col :span="8">
                                        <div class="flag-button" @click="addTagButton('input')">
                                            <i class="el-icon-edit-outline" /><br>
                                            <span>输入框</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="flag-button"  @click="addTagButton('radio')">
                                            <i class="el-icon-open"/><br>
                                            <span>单选框</span>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="flag-button" @click="addTagButton('checkbox')">
                                            <i class="el-icon-set-up" /><br>
                                            <span>复选框</span>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="标签管理" name="2">
                            <!--<div v-for="i in tagList" :key="i.id" class="tag-management">
                                <div>{{i}}</div>
                            </div>-->
                            <el-tag
                                class="falgTag"
                                v-for="tag in tagList"
                                :key="tag.id"
                                closable
                                :type="tag.type"
                                @close="handleClose(tag)"
                            >
                                <i v-if="tag.type == 'input'" class="el-icon-edit-outline"/>
                                <i v-if="tag.type == 'radio'" class="el-icon-open"/>
                                <i v-if="tag.type == 'checkbox'" class="el-icon-set-up"></i>
                                {{tag.name}}
                            </el-tag>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-col>
            <el-col :span="14">
                <div class="editor-middle">
                    <vue-ueditor-wrap v-model="msg" :config="editorConfig" :editorId="editorId"></vue-ueditor-wrap>
                </div>
            </el-col>
            <el-col :span="5">
                <div class="editor-right">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item title="标签属性" name="3">
                            <attribute @upDataTagName="upDataTagName" :flagObj="onTagObj" ref="attInfo"/>
                        </el-collapse-item>
                    </el-collapse>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import attribute from "@/components/signContract/model/attribute";
export default {
    name: "index",
    components: {
        attribute
    },
    data() {
        return {
            editorId: 'editor',
            activeNames: ['1','2','3'],
            msg: '',
            editorConfig: {
                autoHeightEnabled: false,
                initialFrameWidth: '100%',
                initialFrameHeight: Number(document.documentElement.clientHeight-100),
                // 访问 UEditor 静态资源的根路径，可参考 https://hc199421.gitee.io/vue-ueditor-wrap/#/faq
                UEDITOR_HOME_URL: "/UEditor/",
                // 服务端接口（这个地址是我为了方便各位体验文件上传功能搭建的临时接口，请勿在生产环境使用！！！）
                //serverUrl: "//ueditor.szcloudplus.com/cos",
                toolbars: [
                    [
                        'fullscreen', 'source', '|', 'undo', 'redo', '|',
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                        'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                        'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                        'directionalityltr', 'directionalityrtl', 'indent', '|',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                        'simpleupload', 'insertimage', 'emotion', 'attachment', 'pagebreak', 'template', 'background', '|',
                        'horizontal', 'date', 'time', 'spechars',  '|',
                        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                        'print', 'preview', 'searchreplace', 'drafts', 'help'
                    ]
                ]
            },
            tagList: [],
            onTagObj: {}
        }
    },
    watch: {
        // 监听内容变化
        msg:function (newMsg) {
            let parser = new DOMParser();
            let doc=parser.parseFromString(newMsg, "text/html");
            let isChlid = doc.getElementsByTagName("p")
            let tagObjList = []
            if (isChlid.length > 0){
                let chlid = []
                for (var a = 0; a< isChlid.length; a++){
                    chlid = doc.getElementsByTagName("p")[a].children
                    if(typeof(chlid) != "undefined"){
                        for (var i = 0; i < chlid.length; i++ ){
                            if (chlid[i].id != '' && chlid[i].id != null){
                                tagObjList.push(this.tagList.find((item) => item.id == chlid[i].id))
                            }
                        }
                    }
                }
                this.tagList = tagObjList
            }else {
                this.tagList = []
            }
        }
    },
    create(){
    },
    mounted () {
        // 给input 标签添加选中事件
        setTimeout(() =>{
            let that = this
            var ue = window.UE.getEditor('editor')
            ue.addListener('click',function(type, e){
                if (e.target.tagName == 'INPUT' && ue.body.contentEditable!="false") {
                    //that.selectInputDom = e.target
                    //that.editId = e.target.id
                    let onTagObj = {
                        'id': e.target.id,
                        'type': e.target.type,
                        'name': that.tagList.find((item) => item.id == e.target.id ).name
                    }
                    that.onTagObj = onTagObj
                }
            })
        },2000)
    },
    methods: {
        // 删除元素标签
        handleClose(tag) {
            let that = this
            let msg = that.msg
            this.$confirm('是否删除该元素?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.tagList.splice(that.tagList.indexOf(tag), 1)
                let parser = new DOMParser();
                let doc = parser.parseFromString(msg, "text/xml")
                doc.getElementById(tag.id).remove()
                that.msg =  (new XMLSerializer()).serializeToString(doc)
                this.$message({type: 'success', message: '删除成功!'})
            }).catch(() => {
                this.$message({type: 'info', message: '已取消删除'})
            })
        },
        // 添加页面标签
        addTagButton(type){
            let that = this
            let uid = that.UUID()
            switch (type) {
                case 'input':
                    that.tagList.push({'type': 'input', 'id': uid, 'name': '输入框' })
                    window.UE.getEditor('editor').execCommand('insertHtml', `<input id ="`+ uid +`" type="text"></input>`)
                    break;
                case 'radio':
                    that.tagList.push({'type': 'radio', 'id': uid, 'name': '单选框' })
                    window.UE.getEditor('editor').execCommand('insertHtml', `<input id ="`+ uid +`" type="radio"></input>`)
                    break;
                case 'checkbox':
                    that.tagList.push({'type': 'checkbox', 'id': uid, 'name': '多选框' })
                    window.UE.getEditor('editor').execCommand('insertHtml', `<input id ="`+ uid +`" type="checkbox"></input>`)
                    break;
            }
        },
        // 生成全局唯一id
        UUID() {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        },
        // 修改标签名称
        upDataTagName(param) {
            this.tagList = this.tagList.map(item => item.id === param.id ? param : item)
        }
    }
}
</script>

<style scoped>
    .flag-box{
        margin: 0 10px;
        background-color: #f2f2f2;
    }
    .flag-button{
        text-align: center;
        margin: 10px 30px;
    }
    .flag-button:hover{
        color: #00b7ee;
    }
    .editor-right{
        margin-left: 10px;
    }
    .falgTag {
        margin: 10px;
    }
</style>
