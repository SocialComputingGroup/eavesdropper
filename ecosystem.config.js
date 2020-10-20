module.exports = {
  apps : [{
    name: 'bc-eavesdropper',
    script: './built/src/app.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    exec_mode: 'cluster',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '2G'
  }],
};
