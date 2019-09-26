<template>
  <div class="cropper-wrapper">
    <div class="img-box">
      <img :id="imgId" alt="" class="cropper-image">
    </div>
    <div class="right-con">
      <div :id="previewId" class="preview-box" v-if="preview"></div>
      <div class="button-box">
        <slot>
          <Upload :before-upload="beforeUpload" action="image/upload">
            <Button style="width: 150px;" type="primary">上传图片</Button>
          </Upload>
        </slot>
        <div v-show="insideSrc">
          <Button @click="rotate" type="primary">
            <Icon :size="18" type="md-refresh"/>
          </Button>
          <Button @click="shrink" type="primary">
            <Icon :size="18" type="md-remove"/>
          </Button>
          <Button @click="magnify" type="primary">
            <Icon :size="18" type="md-add"/>
          </Button>
          <Button @click="scale('X')" type="primary">
            <Icon :size="18" custom="iconfont icon-shuipingfanzhuan"/>
          </Button>
          <Button @click="scale('Y')" type="primary">
            <Icon :size="18" custom="iconfont icon-chuizhifanzhuan"/>
          </Button>
          <Button @click="move(0, -moveStep)" type="primary">
            <Icon :size="18" type="md-arrow-round-up"/>
          </Button>
          <Button @click="move(-moveStep, 0)" type="primary">
            <Icon :size="18" type="md-arrow-round-back"/>
          </Button>
          <Button @click="move(0, moveStep)" type="primary">
            <Icon :size="18" type="md-arrow-round-down"/>
          </Button>
          <Button @click="move(moveStep, 0)" type="primary">
            <Icon :size="18" type="md-arrow-round-forward"/>
          </Button>
          <Button @click="crop" style="width: 150px;margin-top: 10px;" type="primary">{{ cropButtonText }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Cropper from 'cropperjs'
  import './index.less'
  import 'cropperjs/dist/cropper.min.css'

  export default {
    name: 'Cropper',
    props: {
      src: {
        type: String,
        default: ''
      },
      preview: {
        type: Boolean,
        default: true
      },
      moveStep: {
        type: Number,
        default: 4
      },
      cropButtonText: {
        type: String,
        default: '裁剪'
      }
    },
    data() {
      return {
        cropper: null,
        insideSrc: ''
      }
    },
    computed: {
      imgId() {
        return `cropper${this._uid}`
      },
      previewId() {
        return `cropper_preview${this._uid}`
      }
    },
    watch: {
      src(src) {
        this.replace(src)
      },
      insideSrc(src) {
        this.replace(src)
      }
    },
    methods: {
      beforeUpload(file) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (event) => {
          this.insideSrc = event.srcElement.result
        }
        return false
      },
      replace(src) {
        this.cropper.replace(src)
        this.insideSrc = src
      },
      rotate() {
        this.cropper.rotate(90)
      },
      shrink() {
        this.cropper.zoom(-0.1)
      },
      magnify() {
        this.cropper.zoom(0.1)
      },
      scale(d) {
        this.cropper[`scale${d}`](-this.cropper.getData()[`scale${d}`])
      },
      move(...argu) {
        this.cropper.move(...argu)
      },
      crop() {
        this.cropper.getCroppedCanvas()
          .toBlob(blob => {
            this.$emit('on-crop', blob)
          })
      }
    },
    mounted() {
      this.$nextTick(() => {
        const dom = document.getElementById(this.imgId)
        this.cropper = new Cropper(dom, {
          preview: `#${this.previewId}`,
          checkCrossOrigin: true
        })
      })
    }
  }
</script>
