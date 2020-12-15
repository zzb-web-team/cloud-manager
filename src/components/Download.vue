<template>
  <div class="exportWrapper">
    <div class="wrapper" v-show="showProgress">
        <div class="triangel"></div>
        <img src="../assets/img/excel.png" alt="">
        <div class="progress">
            <div class="progress"  :style="{width: percentage + '%', background: '#297AFF', margin: 0}"></div>
        </div>
        <p v-if="percentage<100">{{percentage}}%</p>
        <img v-else src="../assets/img/complete.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "pagination",
  data() {
    return {
        percentage: 0,
        fileSize: 0,
        showProgress: false, 
    };
  },
  methods: {
    download(url, filename) {
      this.showProgress = true;
    //   this.get_filesize(url);
      this.getBlob(url).then((blob) => {
        console.log(blob);
        this.saveAs(blob, filename);
      });
    },
    get_filesize(url) {
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD",url,true); // Notice "HEAD" instead of "GET",//  to get only the header
        xhr.onreadystatechange = function() {
            if (this.readyState == this.DONE) {
                let fileSize = xhr.getResponseHeader("Content-Length");
                this.fileSize = fileSize;
            }
        };
        xhr.send();
    },
    getBlob(url) {
      return new Promise((resolve) => {
        let that = this; // 创建XMLHttpRequest，会让this指向XMLHttpRequest，所以先接收一下this
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        //监听进度事件
        xhr.addEventListener(
          "progress",
          function (evt) {
            console.log(evt);
            let fileSize = xhr.getResponseHeader("Content-Length");
            console.log(fileSize)
            let percentComplete = evt.loaded / evt.total;
            that.percentage = percentComplete * 100;
          },
          false
        );
        xhr.responseType = "blob";
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(xhr.response);
          }
        };
        xhr.send();
      });
    },
    saveAs(blob, filename) {
      // ie的下载
      console.log(blob, filename);
      this.showProgress = false;
      this.percentage = 0;
      this.fileSize = 0;
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
      } else {
        console.log("aaaaaa");
        // 非ie的下载
        const link = document.createElement("a");
        const body = document.querySelector("body");
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        // fix Firefox
        link.style.display = "none";
        body.appendChild(link);
        link.click();
        body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.exportWrapper{
    display: flex;
    flex-direction: column;
    // justify-content: ;
    align-items: flex-end;
    position: relative;
    .wrapper{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding:25px 15px;
        background: #fff;
        border: 1px solid #eee;
        border-radius: 8px;
        width: 200px;
        position: absolute;
        right: -60px;
        top: 60px;
        z-index: 10;
        .progress{
            width: 100px;
            height: 4px;
            border-radius: 4px;
            background: #DFECFD;
            margin: 0 8px;
        }
    }
    .wrapper:before,.wrapper:after{
        position: absolute;
        content: " ";
        top: -16px;
        left: 100px;
        display: block;
        width: 0;
        height: 0;
        border: 8px solid #fff;
        border-color: transparent transparent #fff transparent;
        z-index: 111;
    }
    .wrapper:after{
        top: -17px;
        border-color: transparent transparent #eee transparent;
        z-index: 11;
    }
}
</style>