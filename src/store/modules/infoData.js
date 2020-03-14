import { getSelect,getInfo ,updateInfo, renzheng} from '@/api/myInfo'
import {  CodeToText, TextToCode } from 'element-china-area-data'
const state = {
  select:{
	  industryTypes:[],
	  companyNatures:[],
	  enterpriseScales:[]
  },
  cityList:[],
  myinfoStatus:true,
  editqsinfo:false,
  info:{
	  enterpriseName: "",//公司名称
	  loginName: "",
	  contactName: "", //联系人名字
	  contactTel: "",
	  email: null,
	  busnissImg: null,//营业执照图片
	  contactImg: null,//联系人头像
	  companyPlane: null, //公司电话
	  state: "0",
	  createBy: null,
	  remark: null,
	  delsign: "",
	  balance: 0,
	  industry: "",//行业类别
	  scale: "", //企业规模
	  nature: "", //公司性质
	  area: "",
	  address: "",
	  consume: null,
	  rumnum: null,
	  recharge: null,
	  creaTime: null,
	  status: null,
	  currencyId: null,
	  transid: null,
	  userInfo: null,
	  phone: null,
	  logo:"",
  },
  rules:{
		enterpriseName: [
		  { required: true, message: '请输入公司名称', trigger: 'blur' },
		],
		industry: [
		   { required: true, message: '请选择', trigger: 'change' }
		],
		scale: [
		   { required: true, message: '请选择', trigger: 'change' }
		],
		nature: [
		   { required: true, message: '请选择', trigger: 'change' }
		],
		companyPlane: [
		   { required: true, message: '请选择', trigger: 'blur' }
		],
		area: [
		   { required: true, message: '请选择', trigger: 'change' }
		],
		busnissImg: [
		   { required: true, message: '请上传营业执照', trigger: 'change' }
		],
		remark: [
		   { required: true, message: '请填写企业描述', trigger: 'change' }
		],
		
  }
}
const mutations = {
	set_info(state, val) {
	  state.info = val
	},
  set_select(state, val) {
    state.select = val
  },
  set_city(state, val) {
    state.select = val
  },
  set_userinfo_status(state, val) {
    state.myinfoStatus = val
  },
  set_editqsinfo(state, val) {
    state.editqsinfo = val
  },
  
}

const actions = {
  updateInfo({commit,state},data) {
    return new Promise((resolve, reject) => {
      updateInfo(data).then((res) => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  renzheng({commit,state},data) {
    return new Promise((resolve, reject) => {
      renzheng(data).then((res) => {
		
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({commit,state}) {
    return new Promise((resolve, reject) => {
      getInfo().then((res) => {
		  
		 let area = res.result.area
		 let arr = area.split(',');
		
		 let str = TextToCode[arr[0]].code+","+TextToCode[arr[0]][arr[1]].code+","+TextToCode[arr[0]][arr[1]][arr[2]].code;
		  res.result.codearea = str.split(',');
		
		
        commit('set_info', res.result)
		
		
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getSelect({commit,state}) {
    return new Promise((resolve, reject) => {
      getSelect().then((res) => {
        commit('set_select', res.result)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
