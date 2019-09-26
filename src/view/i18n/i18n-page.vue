<template>
  <div>
    <Row :gutter="10">
      <i-col span="6">
        <Card>
          <div class="i18n-card-box">
            <DatePicker placeholder="Select date" type="date"></DatePicker>
            <TimePicker placeholder="Select time" placement="bottom-end" style="display: block;margin-top: 10px;" type="timerange"></TimePicker>
            <Button @click="modalVisible = true" style="margin-top: 10px;" type="primary">{{ $t('buttonText') }}</Button>
            <Modal
                :title="$t('modalTitle')"
                v-model="modalVisible">
                <p>{{ content }}</p>
                <p>{{ content }}</p>
                <p>{{ content }}</p>
            </Modal>
            <i class="tip">{{ $t('i18n-tip') }}</i>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'i18n_page',
  data() {
    return {
      modalVisible: false
    }
  },
  computed: {
    content() {
      return this.$t('content')
    }
  }
}
</script>

<style lang="less">
.i18n-card-box{
  height: 200px;
  .tip{
    color: gray;
    display: block;
    margin-top: 20px;
  }
}
</style>
