new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Rádio Gospel Campinas",
          artist: "Ao Vivo!",
          cover: "./01.jpg",
          source: "http://centova.nardele.com.br:4343/;stream/1",
          url: "https://www.igrejaoamordedeus.com.br/",
          favorited: false
        },
		{
           name: "Rádio Pão Diário",
          artist: "Ao Vivo!",
          cover: "./01.jpg",
          source: "http://servidor24.brlogic.com:8808/live",
          url: "https://www.igrejaoamordedeus.com.br/",
          favorited: false
        },
        
        {
           name: "Rádio Estação Gospel",
          artist: "Ao Vivo!",
          cover: "./01.jpg",
          source: "http://live1.livemus.com.br:27054/;",
          url: "https://www.igrejaoamordedeus.com.br/",
          favorited: false
        },
		
		{
           name: "Rádio Nova Geração",
          artist: "Ao Vivo!",
          cover: "./01.jpg",
          source: "http://srv.smghosting.com.br:11416/;",
          url: "https://www.igrejaoamordedeus.com.br/",
          favorited: false
        },
		
		{
           name: "Rádio Perfeito Louvor",
          artist: "Ao Vivo!",
          cover: "./01.jpg",
          source: "https://centova.mundodoradio.com.br:20001/stream?1589293944039",
          url: "https://www.igrejaoamordedeus.com.br/",
          favorited: false
        },
		
		{
           name: "Rádio Betel",
          artist: "Ao Vivo!",
          cover: "./01.jpg",
          source: "http://149.56.85.6:8028/;?1589295073366",
         url: "https://www.igrejaoamordedeus.com.br/",
          favorited: false
        },
		
		{
           name: "Portal Web Gospel",
          artist: "Ao Vivo!",
          cover: "./01.jpg",
          source: "http://centova2.euroti.com.br:8131/stream?1589295366043",
          url: "https://www.igrejaoamordedeus.com.br/",
          favorited: false
        },
		
			{
           name: "Rádio Vida",
          artist: "Ao Vivo!",
          cover: "./01.jpg",
          source: "http://hts06.kshost.com.br:9294/live?1589299595657",
          url: "https://www.igrejaoamordedeus.com.br/",
          favorited: false
        },
		
		{
           name: "Rádio Vitória",
          artist: "Ao Vivo!",
          cover: "./01.jpg",
          source: "http://streaming04.hstbr.net:8156/live?1589299852358",
          url: "https://www.igrejaoamordedeus.com.br/",
          favorited: false
        },
		
		{
           name: "Rádio Bom Gosto",
          artist: "Ao Vivo!",
          cover: "./01.jpg",
          source: "http://stm8.xcast.com.br:11408/;?1589300021767",
          url: "https://www.igrejaoamordedeus.com.br/",
          favorited: false
        },
		
		{
           name: "Rádio Minas Gospel",
          artist: "Ao Vivo!",
          cover: "./01.jpg",
          source: "http://servidor31.brlogic.com:8948/live?1589300174679",
          url: "https://www.igrejaoamordedeus.com.br/",
          favorited: false
        },
		
		{
           name: "Rádio Missionária Filadélfia",
          artist: "Ao Vivo!",
          cover: "./01.jpg",
          source: "http://74.63.241.108:8686/live?1589300503978",
          url: "https://www.igrejaoamordedeus.com.br/",
          favorited: false
        },
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
