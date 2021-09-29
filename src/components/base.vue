<template>
	<div></div>
</template>
<script>
export default {
	data() {
		return {
			clientHeight: document.body.clientHeight,
		};
	},
	components: {},
	filters: {},
	watch: {
		clientHeight(val) {
			// 为了避免频繁触发resize函数导致页面卡顿，使用定时器
			if (!this.timer) {
				// 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
				this.clientHeight = val-60;
				this.timer = true;
                let that = this;
                console.log(this.clientHeight);
				setTimeout(function() {
					// 打印screenWidth变化的值
					that.timer = false;
				}, 400);
			}
		},
	},
	created() {},
	mounted() {
		window.addEventListener(
			'resize',
			() => (this.clientHeight = document.body.clientHeight),
			false
		);
	},
	methods: {},
};
</script>
<style lang="scss" scoped></style>
