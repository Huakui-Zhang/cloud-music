webpackJsonp([5],{HlkZ:function(t,e){},P47m:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("3cXf"),i=n.n(s),o=n("Hn+D"),a=n("ANMl"),l=n("mx1b"),r=(n("d+Yd"),{data:function(){return{index:1,page:1,rankType:1,rankText:["新歌榜","热歌榜","内地榜","港台榜","欧美榜","日韩榜"],songs:[],pageCount:1,songsView:[],dialogVisible:!1,newPlaylist:{id:"",name:"",intro:"",info:""},rules:{name:[{required:!0,message:"请输入歌单名称",trigger:"blur"},{min:1,max:20,message:"长度在 1 到 20 个字符",trigger:"blur"}],intro:[{min:1,max:140,message:"长度在 140 个字符以内",trigger:"blur"}]},userID:"",state:!0,playlistList:[]}},components:{vNav:a.a,vHeader:o.a,vFoot:l.a},created:function(){window.scrollTo(0,0);var t=this.$route.query.rankType;void 0!=t&&(this.index=t.toString())},computed:{serverUrl:function(){return this.$store.state.serverUrl},isLogin:function(){return this.$store.state.isLogin}},mounted:function(){this.userID=this.$store.state.user.Id,this.rankDisplay(this.index),this.getPlaylistList()},methods:{getPlaylistList:function(){if(!this.isLogin)return!1;this.playlistList=this.$store.state.playlistList},indexMethod:function(t){return 20*(this.page-1)+t+1},pagination:function(t){this.page=t,this.songsView.splice(0,this.songsView.length);for(var e=0;e<20;e++)if(null==this.songs[20*(t-1)+e]);else{var n=this.songs[20*(t-1)+e];this.songsView.push(n)}},computePageCount:function(){this.pageCount=Math.ceil(parseFloat(this.songs.length)/20)},handleChange:function(t){t!=this.page&&this.pagination(t)},rankDisplay:function(t){var e=this;this.rankType=t,this.axios.get(this.serverUrl+"/song/rank",{params:{type:t,isAll:!0}}).then(function(t){e.songs=t.data;for(var n=0;n<t.data.length;n++)null==e.songs[n].image?e.songs[n].image=required("../../../assets/暂无图片.png"):e.songs[n].image=e.serverUrl+e.songs[n].image,e.songs[n].filePath=e.serverUrl+e.songs[n].filePath,e.songs[n].lyricsPath=e.serverUrl+e.songs[n].lyricsPath,e.$set(e.songs[n],"Flag",!1),e.$set(e.songs[n],"isopen",!1);e.computePageCount(),e.pagination(1)}).catch(function(t){console.log(t)})},submitForm:function(){var t=this;this.$refs.newPlaylist.validate(function(e){if(!e)return t.$message({showClose:!0,message:"格式不正确",type:"error"}),!1;t.axios.post(t.serverUrl+"/playlist/create",{name:t.newPlaylist.name,intro:t.newPlaylist.intro}).then(function(e){if(-1!=e.data){var n={id:e.data,name:t.newPlaylist.name,intro:t.newPlaylist.intro};t.$store.state.playlistList.push(n),sessionStorage.setItem("playlistList",i()(t.$store.state.playlistList)),t.dialogVisible=!1,t.$refs.newPlaylist.resetFields(),t.$message({showClose:!0,message:"歌单创建成功",type:"success"}),t.addSongToPlaylist(t.newPlaylist.info,e.data)}else t.$message({showClose:!0,message:"会话超时",type:"error"})}).catch(function(t){console.log(t)})})},addAllSongToPlaylist:function(t){var e=this;this.axios.get(this.serverUrl+"/playlist/addAlbum",{params:{albumId:this.album.id,playlistId:t}}).then(function(t){t?e.$message({showClose:!0,message:"已成功添加到歌单",type:"success"}):e.$message({showClose:!0,message:"会话超时",type:"error"})}).catch(function(t){console.log(t)})},addSongToPlaylist:function(t,e){var n=this;this.axios.get(this.serverUrl+"/playlist/addSong",{params:{songId:t,playlistId:e}}).then(function(t){t?n.$message({showClose:!0,message:"已成功添加到歌单",type:"success"}):n.$message({showClose:!0,message:"会话超时",type:"error"})}).catch(function(t){console.log(t)})},downloadSong:function(t){var e=this;this.isLogin?window.location.href=this.serverUrl+"/download/downloadSong?id="+t.id:this.$confirm("还未登录,是否现在登录?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){e.$router.push({path:"/user/unlogin"})}).catch(function(){})},handleSongCommand:function(t){"login"==t?this.$router.push({path:"/user/unlogin"}):"playqueue"==t.type||("newplaylist"==t.type?(this.dialogVisible=!0,this.newPlaylist.info=t.params.id):this.addSongToPlaylist(t.param2.id,t.param1))},handleClose:function(t){this.$confirm("确认关闭？").then(function(e){t()}).catch(function(t){})},handleMouseEnter:function(t,e,n,s){t.Flag=!0},handleMouseOut:function(t,e,n,s){if(t.isopen)return!1;t.Flag=!1},handle:function(t,e){t.Flag=e,t.isopen=e},handleRankCommand:function(t){"login"==t&&this.$router.push({path:"/user/unlogin"}),"newplaylist"==t?(this.dialogVisible=!0,this.newPlaylist.type="rank"):"playqueue"==t?this.$store.dispatch("addToSongList",this.songList):this.addAllSongToPlaylist(t.params)},addToSongList:function(t){t=20*(this.page-1)+t;var e=[this.songs[t]];this.$store.dispatch("addToSongList",e)},addAllToSongList:function(){this.$store.dispatch("addToSongList",this.songs)},playSong:function(t){var e=20*(this.page-1)+t;this.$store.dispatch("play",[this.songs,e,!1])},playAllSong:function(){this.$store.dispatch("play",[this.songs,0,!1])}}}),c={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",[n("v-header"),t._v(" "),n("v-nav")],1),t._v(" "),n("el-row",[n("div",{staticClass:"rank"},[n("el-col",{attrs:{span:6}},[n("div",{staticClass:"navMenu"},[n("div",{staticClass:"rankTitle"},[n("h2",[t._v("排行榜")])]),t._v(" "),n("el-menu",{staticClass:"rankMenu",attrs:{"default-active":t.index,mode:"vertical"}},[n("el-menu-item",{attrs:{index:"1"},on:{click:function(e){t.rankDisplay(1)}}},[t._v("\r\n                        新歌榜\r\n                    ")]),t._v(" "),n("el-menu-item",{attrs:{index:"2"},on:{click:function(e){t.rankDisplay(2)}}},[t._v("\r\n                        热歌榜\r\n                    ")]),t._v(" "),n("el-menu-item",{attrs:{index:"3"},on:{click:function(e){t.rankDisplay(3)}}},[t._v("\r\n                        内地榜\r\n                    ")]),t._v(" "),n("el-menu-item",{attrs:{index:"4"},on:{click:function(e){t.rankDisplay(4)}}},[t._v("\r\n                        港台榜\r\n                    ")]),t._v(" "),n("el-menu-item",{attrs:{index:"5"},on:{click:function(e){t.rankDisplay(5)}}},[t._v("\r\n                        欧美榜\r\n                    ")]),t._v(" "),n("el-menu-item",{attrs:{index:"6"},on:{click:function(e){t.rankDisplay(6)}}},[t._v("\r\n                        日韩榜\r\n                    ")])],1)],1)]),t._v(" "),n("el-col",{attrs:{gutter:2,span:16}},[n("div",{staticClass:"display"},[n("div",{staticClass:"displayTitle"},[n("h1",[t._v(t._s(t.rankText[t.rankType-1]))])]),t._v(" "),n("div",{staticClass:"displaybtn"},[n("el-button",{staticStyle:{"background-color":"#31C27C",float:"right"},attrs:{type:"primary",icon:"el-icon-caret-right",onmouseover:"this.style.backgroundColor='#2CAF6F';",onmouseout:"this.style.backgroundColor='#31C27C';"},on:{click:t.playAllSong}},[t._v("播放全部")])],1),t._v(" "),n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.songsView,"max-height":"1500"},on:{"cell-mouse-enter":t.handleMouseEnter,"cell-mouse-leave":t.handleMouseOut}},[n("el-table-column",{attrs:{prop:"index",width:"50",type:"index",index:t.indexMethod}}),t._v(" "),n("el-table-column",{attrs:{prop:"name",label:"歌曲",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("router-link",{attrs:{to:{path:"/user/songdetail",query:{id:t.songs[e.$index+20*(t.page-1)].id}}}},[n("el-button",{staticStyle:{color:"black",cursor:"pointer","text-decoration":"none"},attrs:{type:"text",onmouseover:"this.style.color='#31C27C';",onmouseout:"this.style.color='black';"}},[t._v(t._s(e.row.name))])],1)]}}])}),t._v(" "),n("el-table-column",{attrs:{label:" ",width:"150",type:"index"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.Flag?n("span",[n("el-button",{attrs:{icon:"el-icon-caret-right",circle:""},nativeOn:{click:function(n){t.playSong(e.$index)}}})],1):t._e(),t._v(" "),e.row.Flag?n("span",[n("el-dropdown",{attrs:{trigger:"click",placement:"bottom-start"},on:{"visible-change":function(n){t.handle(e.row,n)},command:t.handleSongCommand}},[n("el-button",{attrs:{icon:"el-icon-plus",circle:""}}),t._v(" "),n("el-dropdown-menu",{attrs:{slot:"dropdown",data:t.playlistList},slot:"dropdown"},[n("el-dropdown-item",{attrs:{command:t.playqueue},nativeOn:{click:function(n){t.addToSongList(e.$index)}}},[t._v("播放队列")]),t._v(" "),t.isLogin?n("div",[t._l(t.playlistList,function(s){return n("el-dropdown-item",{key:s.id,attrs:{command:{type:"playlist",param1:s.id,param2:e.row}}},[t._v(t._s(s.name))])}),t._v(" "),n("el-dropdown-item",{attrs:{command:{type:"newplaylist",params:e.row},divided:""}},[t._v("添加到新歌单")])],2):n("el-dropdown-item",{attrs:{command:t.login,divided:""}},[t._v("登录后添加到歌单")])],1)],1)],1):t._e(),t._v(" "),n("el-dialog",{attrs:{title:"创建歌单",visible:t.dialogVisible,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("el-form",{ref:"newPlaylist",attrs:{model:t.newPlaylist,rules:t.rules,"label-width":"100px"}},[n("el-form-item",{attrs:{label:"歌单名称",prop:"name"}},[n("el-input",{attrs:{placeholder:"请输入歌单名称"},model:{value:t.newPlaylist.name,callback:function(e){t.$set(t.newPlaylist,"name",e)},expression:"newPlaylist.name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"歌单简介",prop:"intro"}},[n("el-input",{attrs:{type:"textarea",placeholder:"请输入歌单简介"},model:{value:t.newPlaylist.intro,callback:function(e){t.$set(t.newPlaylist,"intro",e)},expression:"newPlaylist.intro"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary"},on:{click:function(e){t.submitForm()}}},[t._v("完成")]),t._v(" "),n("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取消")])],1)],1)],1),t._v(" "),e.row.Flag?n("span",[n("el-button",{attrs:{icon:"el-icon-download",circle:""},on:{click:function(n){t.downloadSong(e.row)}}})],1):t._e()]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"artist",label:"歌手",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("router-link",{attrs:{to:{path:"/user/artistdetail",query:{id:t.songs[e.$index+20*(t.page-1)].artistId}}}},[n("el-button",{staticStyle:{color:"black",cursor:"pointer","text-decoration":"none"},attrs:{type:"text",onmouseover:"this.style.color='#31C27C';",onmouseout:"this.style.color='black';"}},[t._v(t._s(e.row.artistName)+"\r\n                                ")])],1)]}}])}),t._v(" "),n("el-table-column",{attrs:{prop:"duration",label:"时长",width:"100"}})],1),t._v(" "),n("br"),t._v(" "),n("el-pagination",{staticClass:"pagination",attrs:{"page-count":t.pageCount,layout:"prev, pager, next"},on:{"current-change":t.handleChange}}),t._v(" "),n("br")],1)])],1)]),t._v(" "),n("el-row",[n("v-foot")],1)],1)},staticRenderFns:[]};var d=n("vSla")(r,c,!1,function(t){n("HlkZ")},null,null);e.default=d.exports},"d+Yd":function(t,e,n){t.exports=n.p+"static/img/1.28339a7.jpg"}});
//# sourceMappingURL=5.8c8c3cb420c8c1676f20.js.map