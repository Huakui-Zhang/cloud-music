webpackJsonp([3],{"Zq/b":function(t,e){},p08s:function(t,e){},q5cl:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("3cXf"),i=s.n(a),o=s("Hn+D"),r=s("mx1b"),n={components:{vHead:o.a,vFoot:r.a},computed:{serverUrl:function(){return this.$store.state.serverUrl},search:function(){return this.$store.state.search},state:function(){return this.$store.state}},mounted:function(){this.isLogin=this.state.isLogin,this.getPlaylistList(),"歌曲"==this.curTitle?(this.getSongList(this.$store.state.search.name,this.page.cur),this.getSongTotal(this.$store.state.search.name)):"歌手"==this.curTitle?(this.getArtistList(this.$store.state.search.name,this.page.cur),this.getArtistTotal(this.$store.state.search.name)):"专辑"==this.curTitle&&(this.getAlbumList(this.$store.state.search.name,this.page.cur),this.getAlbumTotal(this.$store.state.search.name))},data:function(){return{dialogVisible:!1,isLogin:"",ruleForm:{name:"",des:""},rules:{name:[{required:!0,message:"请输入歌单名称",trigger:"blur"},{min:1,max:30,message:"长度在 1 到 30 个字符",trigger:"blur"}],intro:[{min:1,max:680,message:"长度在 680 个字符以内",trigger:"blur"}]},newPlaylist:{id:"",name:"",intro:"",type:"",info:""},curTitle:"歌曲",headNav:[{title:"歌曲"},{title:"歌手"},{title:"专辑"}],songList:[],artistList:[],albumList:[],playlistList:[],page:{cur:1,total:0}}},methods:{playSong:function(t){this.$store.dispatch("play",[this.songList,t,!1])},cur_title:function(t){this.curTitle=t,this.page.cur=1,"歌曲"==this.curTitle?(this.getSongList(this.$store.state.search.name,this.page.cur),this.getSongTotal(this.$store.state.search.name)):"歌手"==this.curTitle?(this.getArtistList(this.$store.state.search.name,this.page.cur),this.getArtistTotal(this.$store.state.search.name)):"专辑"==this.curTitle&&(this.getAlbumList(this.$store.state.search.name,this.page.cur),this.getAlbumTotal(this.$store.state.search.name))},handleMouseEnter:function(t,e,s,a){t.Flag=!0},handleMouseOut:function(t,e,s,a){if(t.isopen)return!1;t.Flag=!1},handle:function(t,e){t.Flag=e,t.isopen=e},handleClose:function(t){this.$confirm("确认关闭？").then(function(e){t()}).catch(function(t){})},handleSongCommand:function(t){if("login"==t)window.location.href="/";else if("newplaylist"==t.type)this.dialogVisible=!0,this.newPlaylist.type="song",this.newPlaylist.info=t.params.id;else if("playqueue"==t.type){var e=[this.songList[t.params]];this.$store.dispatch("addToSongList",e)}else this.addSongToPlaylist(t.param2.id,t.param1)},submitForm:function(){var t=this;this.$refs.newPlaylist.validate(function(e){if(!e)return t.$message({showClose:!0,message:"格式不正确",type:"error"}),!1;t.axios.post(t.serverUrl+"/playlist/create",{name:t.newPlaylist.name,intro:t.newPlaylist.intro}).then(function(e){if(-1!=e.data){var s={id:e.data,name:t.newPlaylist.name,intro:t.newPlaylist.intro};t.state.playlistList.push(s),sessionStorage.setItem("playlistList",i()(t.$store.state.playlistList)),t.getPlaylistList(),t.dialogVisible=!1,t.$refs.newPlaylist.resetFields(),t.$message({showClose:!0,message:"歌单创建成功",type:"success"}),t.addSongToPlaylist(t.newPlaylist.info,e.data)}else t.$message({showClose:!0,message:"会话超时",type:"error"})}).catch(function(t){console.log(t)})})},downloadSong:function(t){this.isLogin?window.location.href=this.serverUrl+"/download/downloadSong?id="+t.id:this.$confirm("还未登录,是否现在登录?","提示",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(){window.location.href="/"}).catch(function(){})},getPlaylistList:function(){if(!this.isLogin)return!1;this.playlistList=this.state.playlistList},addSongToPlaylist:function(t,e){var s=this;this.axios.get(this.serverUrl+"/playlist/addSong",{params:{songId:t,playlistId:e}}).then(function(t){t?s.$message({showClose:!0,message:"已成功添加到歌单",type:"success"}):s.$message({showClose:!0,message:"会话超时",type:"error"})}).catch(function(t){console.log(t)})},handleCurrentChange:function(t){this.page.cur=t,"歌曲"==this.curTitle?this.getSongList(this.$store.state.search.name,this.page.cur):"歌手"==this.curTitle?this.getArtistList(this.$store.state.search.name,this.page.cur):this.getAlbumList(this.$store.state.search.name,this.page.cur)},getSongList:function(t,e){var s=this;this.axios.get(this.serverUrl+"/song/searchSong",{params:{name:t,page:e}}).then(function(t){s.songList=t.data;for(var e=0;e<s.songList.length;e++)s.$set(s.songList[e],"Flag",!1),s.$set(s.songList[e],"isopen",!1),s.songList[e].image=s.serverUrl+s.songList[e].image,s.songList[e].lyricsPath=s.serverUrl+s.songList[e].lyricsPath,s.songList[e].filePath=s.serverUrl+s.songList[e].filePath}).catch(function(t){console.log(t)})},getArtistList:function(t,e){var s=this;this.axios.get(this.serverUrl+"/artist/searchArtist",{params:{name:t,page:e}}).then(function(t){s.artistList=t.data;for(var e=0;e<t.data.length;e++)s.artistList[e].image=s.serverUrl+s.artistList[e].image}).catch(function(t){console.log(t)})},getAlbumList:function(t,e){var s=this;this.axios.get(this.serverUrl+"/album/searchAlbum",{params:{name:t,page:e}}).then(function(t){s.albumList=t.data;for(var e=0;e<t.data.length;e++)s.albumList[e].image=s.serverUrl+s.albumList[e].image}).catch(function(t){console.log(t)})},getSongTotal:function(t){var e=this;this.axios.get(this.serverUrl+"/song/searchSongCount",{params:{name:t}}).then(function(t){e.page.total=t.data}).catch(function(t){console.log(t)})},getArtistTotal:function(t){var e=this;this.axios.get(this.serverUrl+"/artist/searchArtistCount",{params:{name:t}}).then(function(t){e.page.total=t.data}).catch(function(t){console.log(t)})},getAlbumTotal:function(t){var e=this;this.axios.get(this.serverUrl+"/album/searchAlbumCount",{params:{name:t}}).then(function(t){e.page.total=t.data}).catch(function(t){console.log(t)})}}},l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wrapper"},[s("v-head"),t._v(" "),s("div",{staticClass:"search_nav"},[s("ul",{staticClass:"menu_2"},t._l(t.headNav,function(e){return s("li",{class:{nav_color:t.curTitle==e.title},on:{click:function(s){t.cur_title(e.title)}}},[t._v("\n\t\t\t\t"+t._s(e.title)+"\n\t\t\t")])})),t._v(" "),s("div",{staticStyle:{clear:"both"}})]),t._v(" "),s("div",{staticClass:"search_main"},["歌曲"==t.curTitle?s("div",{staticClass:"search_song",staticStyle:{margin:"0 auto",width:"82%"}},[s("el-table",{staticClass:"search_spHeight",staticStyle:{width:"100%"},attrs:{data:t.songList,stripe:!0},on:{"cell-mouse-enter":t.handleMouseEnter,"cell-mouse-leave":t.handleMouseOut}},[s("el-table-column",{attrs:{label:"歌曲"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("router-link",{attrs:{tag:"a",to:{path:"/user/songdetail",query:{id:e.row.id}}}},[s("span",{staticStyle:{color:"black",cursor:"pointer"},attrs:{onmouseover:"this.style.color='#31C27C';",onmouseout:"this.style.color='black';"}},[t._v(t._s(e.row.name))])])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:" "},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.Flag?s("span",[s("el-button",{attrs:{icon:"el-icon-caret-right",circle:""},on:{click:function(s){t.playSong(e.$index)}}})],1):t._e(),t._v(" "),e.row.Flag?s("span",[s("el-dropdown",{attrs:{trigger:"click",placement:"bottom-start"},on:{"visible-change":function(s){t.handle(e.row,s)},command:t.handleSongCommand}},[s("el-button",{attrs:{icon:"el-icon-plus",circle:""}}),t._v(" "),s("el-dropdown-menu",{attrs:{slot:"dropdown",data:t.playlistList},slot:"dropdown"},[s("el-dropdown-item",{attrs:{command:{type:"playqueue",params:e.$index}}},[t._v("播放队列")]),t._v(" "),t.isLogin?s("div",[t._l(t.playlistList,function(a){return s("el-dropdown-item",{key:a.id,attrs:{command:{type:"playlist",param1:a.id,param2:e.row}}},[t._v(t._s(a.name))])}),t._v(" "),s("el-dropdown-item",{attrs:{command:{type:"newplaylist",params:e.row},divided:""}},[t._v("添加到新歌单")])],2):s("el-dropdown-item",{attrs:{command:"login",divided:""}},[t._v("登录后添加到歌单")])],1)],1)],1):t._e(),t._v(" "),e.row.Flag?s("span",[s("el-button",{attrs:{icon:"el-icon-download",circle:""},on:{click:function(s){t.downloadSong(e.row)}}})],1):t._e()]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"歌手"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("router-link",{attrs:{tag:"a",to:{path:"/user/artistdetail",query:{id:e.row.artistId}}}},[s("span",{staticStyle:{color:"black",cursor:"pointer"},attrs:{onmouseover:"this.style.color='#31C27C';",onmouseout:"this.style.color='black';"}},[t._v(t._s(e.row.artistName))])])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"专辑"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("router-link",{attrs:{tag:"a",to:{path:"/user/albumdetail",query:{id:e.row.albumId}}}},[s("span",{staticStyle:{color:"black",cursor:"pointer"},attrs:{onmouseover:"this.style.color='#31C27C';",onmouseout:"this.style.color='black';"}},[t._v(t._s(e.row.albumName))])])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"time",label:"时长"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.duration))])]}}])})],1),t._v(" "),s("div",{staticClass:"pagination-footer",staticStyle:{"margin-top":"50px"}},[s("el-pagination",{attrs:{"current-page":t.page.cur,"page-size":20,background:"",layout:"total, prev, pager, next",total:t.page.total},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),s("el-dialog",{attrs:{title:"创建歌单",visible:t.dialogVisible,width:"30%","before-close":t.handleClose},on:{"update:visible":function(e){t.dialogVisible=e}}},[s("el-form",{ref:"newPlaylist",attrs:{model:t.newPlaylist,rules:t.rules,"label-width":"100px"}},[s("el-form-item",{attrs:{label:"歌单名称",prop:"name"}},[s("el-input",{attrs:{placeholder:"请输入歌单名称"},model:{value:t.newPlaylist.name,callback:function(e){t.$set(t.newPlaylist,"name",e)},expression:"newPlaylist.name"}})],1),t._v(" "),s("el-form-item",{attrs:{label:"歌单简介",prop:"intro"}},[s("el-input",{attrs:{type:"textarea",placeholder:"请输入歌单简介"},model:{value:t.newPlaylist.intro,callback:function(e){t.$set(t.newPlaylist,"intro",e)},expression:"newPlaylist.intro"}})],1),t._v(" "),s("el-form-item",[s("el-button",{attrs:{type:"primary"},on:{click:t.submitForm}},[t._v("完成")]),t._v(" "),s("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取消")])],1)],1)],1)],1):t._e(),t._v(" "),"歌手"==t.curTitle?s("div",{staticClass:"search_artist"},[s("ul",{attrs:{id:"singerlist"}},t._l(t.artistList,function(e){return s("li",{staticClass:"singerli"},[s("div",{staticClass:"singer"},[s("router-link",{attrs:{tag:"a",to:{path:"/user/artistdetail",query:{id:e.id}}}},[s("img",{staticStyle:{"border-radius":"100%",padding:"35px"},attrs:{src:e.image,alt:""}}),t._v(" "),s("p",{staticStyle:{color:"black",cursor:"pointer"},attrs:{onmouseover:"this.style.color='#31C27C';",onmouseout:"this.style.color='black';"}},[t._v(t._s(e.name))])])],1)])})),t._v(" "),s("div",{staticStyle:{clear:"both"}}),t._v(" "),s("div",{staticClass:"pagination-footer"},[s("el-pagination",{attrs:{"current-page":t.page.cur,"page-size":20,background:"",layout:"total, prev, pager, next",total:t.page.total},on:{"current-change":t.handleCurrentChange}})],1)]):t._e(),t._v(" "),"专辑"==t.curTitle?s("div",{staticClass:"search_artist"},[s("el-row",{attrs:{gutter:"20"}},t._l(t.albumList,function(e){return s("el-col",{key:e.id,staticStyle:{width:"20%"},attrs:{data:t.albumList}},[s("el-card",{staticStyle:{border:"none","margin-bottom":"20px"},attrs:{"body-style":{padding:"0px"},shadow:"never"}},[s("router-link",{attrs:{tag:"a",to:{path:"/user/albumdetail",query:{id:e.id}}}},[s("img",{staticClass:"image",attrs:{src:e.image}})]),t._v(" "),s("div",{staticStyle:{"line-height":"8px","font-size":"5px"}},[s("router-link",{attrs:{tag:"a",to:{path:"/user/albumdetail",query:{id:e.id}}}},[s("p",{staticStyle:{color:"black",cursor:"pointer"},attrs:{onmouseover:"this.style.color='#31C27C';",onmouseout:"this.style.color='black';"}},[t._v(t._s(e.name))])]),t._v(" "),s("router-link",{attrs:{tag:"a",to:{path:"/user/artistdetail",query:{id:e.artistId}}}},[s("p",{staticStyle:{color:"black",cursor:"pointer"},attrs:{onmouseover:"this.style.color='#31C27C';",onmouseout:"this.style.color='black';"}},[t._v(t._s(e.artistName))])])],1)],1)],1)})),t._v(" "),s("div",{staticClass:"pagination-footer"},[s("el-pagination",{attrs:{"current-page":t.page.cur,"page-size":20,background:"",layout:"total, prev, pager, next",total:t.page.total},on:{"current-change":t.handleCurrentChange}})],1)],1):t._e()]),t._v(" "),s("v-foot")],1)},staticRenderFns:[]};var c=s("vSla")(n,l,!1,function(t){s("Zq/b"),s("p08s")},"data-v-45e65d28",null);e.default=c.exports}});
//# sourceMappingURL=3.da674c10bde14916ed6a.js.map