const NodeMediaServer = require('node-media-server');

const httpConfig = {
  port: 8000,
  allow_origin: '*',
  mediaroot: './media',
};

const rtmpConfig = {
  port: 1935,
  chunk_size: 60000,
  gop_cache: true,
  ping: 10,
  ping_timeout: 60,
};

/**
 * We need the version 4 of ffmpeg
 * https://askubuntu.com/questions/1360827/safest-way-to-install-latest-stable-ffmpeg-4-3-on-ubuntu-20-04-ppa-not-wor
 */
const transformationConfig = {
  ffmpeg: '/usr/bin/ffmpeg',
  tasks: [
    {
      app: 'live',
      hls: true,
      hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
      hlsKeep: false,
    },
  ],
  MediaRoot: './media',
};

const config = {
  http: httpConfig,
  rtmp: rtmpConfig,
  trans: transformationConfig,
  auth: {
    api: false,
    api_user: 'admin',
    api_pass: 'admin',
  },
};

const nms = new NodeMediaServer(config);

nms.on('preConnect', (id, args) => {
  console.log(
    '[NodeEvent on preConnect]',
    `id=${id} args=${JSON.stringify(args)}`
  );

  //let session = nms.getSession(id);
  /*const currentTime = new Date();

  // Convert 4:15 PM to 24-hour format (i.e., 16:15)
  const targetTime = new Date();
  targetTime.setHours(18, 17, 0, 0);

  if (currentTime > targetTime) {
    console.log("It's later than 4:15 PM, moving to the next task.");
  } else {
    const session = nms.getSession(id);
    if (session) {
      if (session.socket) {
        session.socket.end(); // Cerrar la conexión RTMP
      }
    }
    return;
  }*/
});

nms.on('postConnect', (id, args) => {
  console.log(
    '[NodeEvent on postConnect]',
    `id=${id} args=${JSON.stringify(args)}`
  );
});

nms.on('doneConnect', (id, args) => {
  console.log(
    '[NodeEvent on doneConnect]',
    `id=${id} args=${JSON.stringify(args)}`
  );
});

nms.on('prePublish', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on prePublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
  // Implement authentication for your streamers...
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPublish', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on postPublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});

nms.on('donePublish', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on donePublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});

nms.on('prePlay', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on prePlay]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
  // let session = nms.getSession(id);
  // session.reject();
});

nms.on('postPlay', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on postPlay]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});

nms.on('donePlay', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on donePlay]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
  );
});

nms.run();
