package controller;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.musicweb.dao.AlbumDao;
import com.musicweb.util.RedisUtil;

import base.BaseTest;

public class SongControllerTest extends BaseTest{

	@Autowired
	AlbumDao albumDao;
	@Autowired
	RedisUtil redisUtil;

   @Test
   public void test() throws Exception 
   {
	   System.out.println("---------------------------------123---------------------------------");
	   redisUtil.hset("song_play_count", "32", 1);
	   System.out.println(redisUtil.hget("song_play_count", "32"));
       System.out.println("---------------------------------321---------------------------------");
   }

}