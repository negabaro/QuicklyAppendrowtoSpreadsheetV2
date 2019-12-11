<template>
	<div id="option">
		<el-row>
			<el-form ref="form" label-width="80px" label-position="left" size="small">
				<el-form-item label="뱃지">
					<span slot="label">
						커맨트
						<el-popover trigger="hover" placement="bottom">
							<span slot>우측 상단에 표기되는 데이터 타입을 설정합니다.</span>
							<i slot="reference" class="el-icon-question"></i>
						</el-popover>
					</span>
					<el-select v-model="serviceType" filterable placeholder="가져올 커맨트 수" :disabled="!isLogin">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						></el-option>
					</el-select>
					<!-- 
          <span slot="label">
            뱃지
            <el-popover trigger="hover" placement="bottom">
              <span slot>우측 상단에 표기되는 데이터 타입을 설정합니다.</span>
              <i slot="reference" class="el-icon-question"></i>
            </el-popover>
          </span>
          <el-select v-model="badgeType" @change="onBadgeTypeChanged">
            <el-option v-for="item in BADGE_TYPE" :key="item.value" :label="item.label" :value="item.value">{{
              item.label
            }}</el-option>
          </el-select>-->
				</el-form-item>

				<el-form-item label="초기화">
					<span slot="label">
						초기화
						<el-popover trigger="hover" placement="bottom">
							<span slot>현재 저장된 계정, 옵션 정보가 초기화됩니다.</span>
							<i slot="reference" class="el-icon-question"></i>
						</el-popover>
					</span>
					<el-button :type="reset ? 'success' : 'primary'" size="small" @click="handleClick" :disabled="!isLogin">
						<span v-if="reset">
							<i class="el-icon-check"></i>
							저장됨
						</span>
						<span v-else>초기화</span>
					</el-button>
				</el-form-item>

				<!-- <el-form-item label="Dev">
          <el-button size="small" @click="DevSet">
            Dev
          </el-button>
          <el-button size="small" @click="DevSet2">
            Dev2
          </el-button>
        </el-form-item>-->
			</el-form>
		</el-row>
	</div>
</template>

<script>
// import { BADGE_TYPE } from '@/utils';
// import mixin from '../../mixin/mixin';
export default {
	props: ['isLogin'],
	data() {
		return {
			num: 5,
			options: [
				{
					value: '50',
					label: '50',
				},
				{
					value: '100',
					label: '100',
				},
				{
					value: '300',
					label: '300',
				},
				{
					value: '500',
					label: '500',
				},
				{
					value: '9999999999999',
					label: '전체',
				},
			],
			value: '',
			serviceType: null,
			saved: false,
			reset: false,
		};
	},
	created() {
		chrome.storage.sync.get(null, result => {
			this.serviceType = result.getCommentCnt;
			console.log('created:', result);
		});
		/*
    this.$root.$on('updated', () => {
      chrome.storage.sync.get(null, result => this.init(result));
    }); */
	},

	methods: {
		save(payload) {
			console.log('payload', payload);
			chrome.storage.sync.set(payload, result => {
				console.log('saved result :', result);
			});

			chrome.storage.local.set(payload, function() {
				console.log('saved result22 :');
			});

			console.log('this.serviceType!!', this.serviceType);

			// this.serviceType = this.value;
		},

		updateData() {
			const payload = {
				getCommentCnt: this.serviceType,
			};
			// this.save(payload, 'updated');
			this.save(payload);
			this.saved = true;
			setTimeout(() => {
				this.saved = false;
			}, 3000);
		},
		resetData() {},
		handleClick() {
			this.updateData();
		},
	},
};
</script>

<style lang="scss" scoped></style>
