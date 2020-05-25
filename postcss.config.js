module.exports = {
		plugins: { 
			'autoprefixer':{
					"overrideBrowserslist": [
							"defaults",
							"not ie < 11",
							"last 2 versions",
							"> 1%",
							"iOS 7",
							"last 3 iOS versions"
					]
			},
			'yu-pxtopx': { 
				rootValue: 1,      
				//换算px的数值，1是不变，如果是2/3，6px打包后就是9px
				propList: ['*'],
				minPixelValue: 1.01   //小于1.01px的样式不换算
			}
		}
};