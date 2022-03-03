<template>
    <div class="attribute-box">
        <el-form :label-position="labelPosition" label-width="auto" :model="formTagObj" size="mini">
            <el-form-item label="id">
                <el-input v-model="formTagObj.id"></el-input>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="formTagObj.name"></el-input>
            </el-form-item>
            <el-form-item label="默认值">
                <el-input v-model="formTagObj.id"></el-input>
            </el-form-item>
            <el-form-item label="外观">
                <el-input v-model="formTagObj.id"></el-input>
            </el-form-item>
            <el-form-item label="控件大小">
                <el-input v-model="formTagObj.id"></el-input>
            </el-form-item>
            <el-form-item label="字符限制">
                <el-input v-model="formTagObj.id"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "attribute",
        props: {
            flagObj: {
                type: Object,
                default() {
                    return { id: '', name: ''}
                }
            }
        },
        computed: {
            comFormTagObj(){
                return JSON.parse(JSON.stringify(this.formTagObj))
            }
        },
        watch: {
            flagObj: function() {
                this.formTagObj.id = this.flagObj.id;
                this.formTagObj.name = this.flagObj.name;
            },
            'comFormTagObj':{
                handler:function(newV, oldV){
                    if(newV.id == oldV.id){
                        this.$emit('upDataTagName', newV)
                    }
                },
                deep: true
            },

        },
        data() {
            return {
                labelPosition: 'right',
                formTagObj: {
                    id: '',
                    name: ''
                }
            }
        },
        created() {

        },
        methods: {

        }
    }
</script>

<style scoped>
.attribute-box{

}
</style>
