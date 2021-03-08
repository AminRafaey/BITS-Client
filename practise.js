const messages = [
  {
    count: 0,
    jid: '923222070707@s.whatsapp.net',
    message: 'true',
    messages: [],
    mute: '0',
    name: 'Moeed',
    spam: 'false',
    t: 1615058845,
  },
  {
    count: 0,
    jid: '923248473417-1611499353@g.us',
    message: 'true',
    messages: [],
    modify_tag: '721344',
    mute: '0',
    name: 'CodeMox',
    spam: 'false',
    t: 1615054780,
  },

  {
    count: 0,
    jid: '923224797905@s.whatsapp.net',
    message: 'true',
    messages: [],
    modify_tag: '90971',
    mute: '0',
    name: 'My Everything❤️',
    spam: 'false',
    t: 1615048407,
  },
];

const unread = [
  {
    ephemeralOutOfSync: false,
    key: {
      remoteJid: '923327104504@s.whatsapp.net',
      fromMe: false,
      id: '3A59F412200564FA314A',
    },
    message: {
      documentMessage: {
        contextInfo: { forwardingScore: 1, isForwarded: true },
        directPath:
          '/v/t62.7119-24/32415195_711197439557130_926166772341637466_n.enc?oh=8109fd1c1d29a99ed8b034769a1476b7&oe=606591AC&_nc_hot=1614527140',
        fileEncSha256: 'tK1p58saodHMvErgXUGoB9om6mpVP8PPF2/w0Necqms=',
        fileLength: '800820',
        fileName: '20210228-1930-Classes-UG.pdf',
        fileSha256: '75jk2y1UMJQT2hykhr5gJ9Hng8Gbx8dd+xy+9WHz/5s=',
        jpegThumbnail: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFR',
        mediaKey: 'oeDxqlI+3UJiUUnw7/M93EDxtWxuYIzMTrhSNHSiFr8=',
        mediaKeyTimestamp: '1614526913',
        mimetype: 'application/pdf',
        pageCount: 182,
        title: '20210228-1930-Classes-UG.pdf',
        url:
          'https://mmg.whatsapp.net/d/f/AukoZEoHBRZcWrqYT3RXyE40CDg4D2_KcSwFZTDbS3sF.enc',
      },
    },
    messageTimestamp: '1614527152',
    status: 'ERROR',
  },

  {
    ephemeralOutOfSync: false,
    key: {
      remoteJid: '923327104504@s.whatsapp.net',
      fromMe: false,
      id: '3AB4A0370AFD02CE7AB7',
    },
    message: { conversation: '18 liya' },
    messageTimestamp: '1614788595',
    status: 'ERROR',
  },
];

const chat = [
  {
    ephemeralOutOfSync: false,
    key: {
      remoteJid: '923327104504@s.whatsapp.net',
      fromMe: false,
      id: '3AB4A0370AFD02CE7AB7',
    },
    message: { conversation: '18 liya' },
    messageTimestamp: '1614788595',
    status: 'ERROR',
  },

  {
    ephemeralOutOfSync: false,
    key: {
      remoteJid: '923327104504@s.whatsapp.net',
      fromMe: false,
      id: '3A59F412200564FA314A',
    },
    message: { documentMessage: {} },
    messageTimestamp: '1614527152',
    status: 'ERROR',
  },

  {
    ephemeralOutOfSync: false,
    key: {
      remoteJid: '923327104504@s.whatsapp.net',
      fromMe: false,
      id: '3A6E13E029B9C3988FBD',
    },
    message: { extendedTextMessage: {} },
    messageTimestamp: '1613214256',
    status: 'ERROR',
  },

  {
    ephemeralOutOfSync: false,
    key: {
      remoteJid: '923327104504@s.whatsapp.net',
      fromMe: false,
      id: '3A94D3B4B77F78214D72',
    },
    message: { extendedTextMessage: {} },
    messageTimestamp: '1613214256',
    status: 'ERROR',
  },
];

console.log(
  messages.findIndex((x) => x.jid === '923248473417-1611499353@g.us')
);
