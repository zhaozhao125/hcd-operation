<template>
    <div class="x-data-detail">
      <div class="x-detail-block" v-for="(item, index) in detailSettings" :key='index'>
        <h4 class="x-detail-title">{{item.label}}</h4>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :md="8" v-for="(item, index) in item.items" :key='index'>
            <div class="x-detail-item" v-if = "item.type === 'normal'" >
              <div class="x-label">{{item.label}}</div>
              <div class="x-value">
                {{detailData[item.name]}}
                <span class="detail-append" v-if="detailData[item.name] && item.append">{{item.append}}</span>
                </div>
            </div>
            <div class="x-detail-item" v-else>
              <div class="x-label">{{item.label}}</div>
              <div class="x-value">
                <slot :name="item.name" ></slot>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    detailData: {
      default: {},
      type: Object
    },
    detailSettings: {
      default: [],
      type: Array
    }
  },
  data () {
    return {
    }
  }
}
</script>
