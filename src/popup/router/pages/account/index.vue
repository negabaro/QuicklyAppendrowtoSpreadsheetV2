<template>
	<div id="dashboard" shadow="never">
		xxxz
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
// import OauthSwitch from '../../components/OauthSwitch';
// import { getServiceLabelByValue } from '@/utils';
// import mixin from '../../mixin/mixin';
export default {
	props: ['isLogin'],
	components: {
		// OauthSwitch,
	},
	computed: {},
	beforeDestroy() {
		clearInterval(this.timer);
	},
	mounted() {},
	methods: {
		initComponent() {
			if (this.isReady) {
				this.timer = setInterval(this.runTimer, 50);
			}
		},
	},
	// mixins: [mixin],
};
</script>

<style lang="scss" scoped>
// @import '../../style/global.scss';
#dashboard {
	position: relative;
	.username {
		font-size: 10px;
		.username-highlighter {
			font-size: 14px;
		}
	}
	.duration {
		position: absolute;
		right: 0;
		color: #909399;
		font-size: 1rem;
	}
	.remain-percentage {
		margin: 10px 0;
		font-size: 15px;
		.remain-percentage-highlighter {
			font-size: 42px;
			font-weight: 900;
		}
		.remain-percentage-unit {
			font-weight: 600;
		}
	}
	.percentage-progress {
		margin: 10px 0;
	}
	.tab-info {
		position: relative;
		display: flex;
		left: -20px;
		width: calc(100% + 40px);
		.tab-item {
			flex: 1;
			text-align: center;
			height: 60px;
			margin-left: 5px;
			transition: 0.5s ease;
			&:last-child {
				margin-right: 5px;
			}
		}
	}
	.no-info {
		display: flex;
		justify-content: center;
		vertical-align: middle;
		flex-direction: column;
		text-align: center;
		height: 230px;
		.alert-icon {
			font-size: 30px;
		}
	}
}
</style>
