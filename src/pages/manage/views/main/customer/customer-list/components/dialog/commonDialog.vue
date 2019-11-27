<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    :width="width"
    :before-close="handleClose"
    :modal-append-to-body="false">
    <slot name = "form"></slot>
    <slot name = "searchTable"></slot>
    <span slot="footer" class="dialog-footer" v-if = "showButton">
      <el-button @click="$emit('update:visible', false)" size = "small">取 消</el-button>
      <el-button type="primary" @click="$emit('confirm')" size="small">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import formSettings from './formSetting.js'
export default {
  data () {
    return {
      formSettings: formSettings
    }
  },
  props: {
    visible: {
      type: Boolean
    },
    title: {
      type: String
    },
    width: {
      type: String
    },
    isClearCheck: {
      type: Boolean,
      default: false
    },
    showButton: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    visible(val) {
      if (val) {
        if (this.isClearCheck) {
          this.$emit('clearCheck')
        }
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
    }
  }
}
</script>
