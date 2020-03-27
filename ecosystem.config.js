/**
 *
 * Config file for PM2 integration
 *
 * @version $Id: $
 *
 */

const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: 'config/.env'});
const instanceName = process.env.INSTANCE_NAME || '';
const previewInstanceName = instanceName + '-preview';

const nodeArgs = process.env.NODE_ARGS || '--max-old-space-size=4096';
const maxMemoryRestart = process.env.MAX_MEMORY_RESTART || '3500M';

// If you want to set a different path in local dev machine, we can make this an environment variable as well.
const logPath = path.join(__dirname, '../../logs/');

module.exports = {
  apps: [

    /**
     * EA Application configuration section
     */

    {
      name: 'Frontend_PWA',
      script: path.join(__dirname, 'builds/server/server.js'),
      instances: process.env.INSTANCES,
      exec_mode: 'cluster',
      output: path.join(logPath, instanceName, instanceName + '.out'),
      error: path.join(logPath, instanceName, instanceName + '.err'),
      log: path.join(logPath, instanceName, instanceName + '.log'),
      merge_logs: true,
      node_args: nodeArgs,
      log_date_format: 'YYYY-MM-DD HH:mm',
      max_memory_restart : maxMemoryRestart,
      env: {
        NODE_ENV: process.env.NODE_ENV,
        INSTANCE_NAME: instanceName,
        SERVICE_PATH: process.env.SERVICE_PATH,
        PORT: process.env.PORT,
        APP_HOST: process.env.APP_HOST,
        SECURE_PORT:process.env.SECURE_PORT
      },
      env_dev: { },
      env_sit: {
        NODE_ENV: 'production',
        //SERVICE_PATH:'',
        ENVIRONMENT:'sit',
        // TLS_ENABLE:'true',
        // TLS_KEY:'/u01/oracle/atg/data/certificates/node/certificados/newatg.key',
        // TLS_CERT:'/u01/oracle/atg/data/certificates/node/certificados/newatg.crt',
        // TLS_CA:'/u01/oracle/atg/data/certificates/node/certificados/newatginter.crt',
        // WS_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgWS.key',
        // WS_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgWS.crt',
        // WS_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterWS.crt',
        // WE_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPBWE.key',
        // WE_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgWE.crt',
        // WE_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterWE.crt',
        // PB_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPB.key',
        // PB_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgPB.crt',
        // PB_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterPB.crt',
        // PBT_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPBT.key',
        // PBT_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgPBT.crt',
        // PBT_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterPBT.crt',
        // PBK_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPBK.key',
        // PBK_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgPBK.crt',
        // PBK_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterPBK.crt',
        // COR_ID:'23f585945be2f',
        // AUTH_KEY:'DJK7uDwZx5O49dWfKE2tfuCPhr6Dqw%2F',
       },
      env_qa: {
        NODE_ENV: 'production',
        ENVIRONMENT:'qa',
        // TLS_ENABLE:'true',
        // TLS_KEY:'/u01/oracle/atg/data/certificates/node/certificados/newatg.key',
        // TLS_CERT:'/u01/oracle/atg/data/certificates/node/certificados/newatg.crt',
        // TLS_CA:'/u01/oracle/atg/data/certificates/node/certificados/newatginter.crt',
        // WS_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgWS.key',
        // WS_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgWS.crt',
        // WS_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterWS.crt',
        // WE_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPBWE.key',
        // WE_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgWE.crt',
        // WE_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterWE.crt',
        // PB_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPB.key',
        // PB_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgPB.crt',
        // PB_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterPB.crt',
        // PBT_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPBT.key',
        // PBT_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgPBT.crt',
        // PBT_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterPBT.crt',
        // PBK_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPBK.key',
        // PBK_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgPBK.crt',
        // PBK_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterPBK.crt',
        // COR_ID:'23f585945be2f',
        // AUTH_KEY:'DJK7uDwZx5O49dWfKE2tfuCPhr6Dqw%2F',
       },
      env_prod: {
        NODE_ENV: 'production',
        ENVIRONMENT:'prod',
        TLS_ENABLE:'false',
      }
    },


    /**
     * Application configuration section
     */
    {
      name: 'Frontend_Preview',
      script: path.join(__dirname, 'server/server.js'),
      instances: process.env.INSTANCES,
      exec_mode: 'cluster',
      output: path.join(logPath, previewInstanceName, previewInstanceName + '.out'),
      error: path.join(logPath, previewInstanceName, previewInstanceName + '.err'),
      log: path.join(logPath, previewInstanceName, previewInstanceName + '.log'),
      merge_logs: true,
      node_args: nodeArgs,
      log_date_format: 'YYYY-MM-DD HH:mm',
      max_memory_restart : maxMemoryRestart,
      env: {
        NODE_ENV: process.env.NODE_ENV,
        INSTANCE_NAME: previewInstanceName,
        SERVICE_PATH: process.env.PREVIEW_SERVICE_PATH,
        PORT: process.env.PREVIEW_PORT,
        APP_HOST: process.env.APP_HOST,
        SECURE_PORT:process.env.PREVIEW_SECURE_PORT
      },
      env_dev: { },
      env_sit: {
        NODE_ENV: 'production',
		    //SERVICE_PATH:'',
        STATIC_ASSETS_PATH:'',
        ENVIRONMENT:'sit',
        // TLS_ENABLE:'true',
        // TLS_KEY:'/u01/oracle/atg/data/certificates/node/certificados/newatg.key',
        // TLS_CERT:'/u01/oracle/atg/data/certificates/node/certificados/newatg.crt',
        // TLS_CA:'/u01/oracle/atg/data/certificates/node/certificados/newatginter.crt',
        // WS_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgWS.key',
        // WS_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgWS.crt',
        // WS_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterWS.crt',
        // WE_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPBWE.key',
        // WE_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgWE.crt',
        // WE_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterWE.crt',
        // PB_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPB.key',
        // PB_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgPB.crt',
        // PB_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterPB.crt',
        // PBT_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPBT.key',
        // PBT_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgPBT.crt',
        // PBT_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterPBT.crt',
        // PBK_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPBK.key',
        // PBK_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgPBK.crt',
        // PBK_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterPBK.crt',
        // COR_ID:'23f585945be2f',
        // AUTH_KEY:'DJK7uDwZx5O49dWfKE2tfuCPhr6Dqw%2F'
      },
      env_qa: {
        NODE_ENV: 'production',
        ENVIRONMENT:'qa',
        // TLS_ENABLE:'true',
        // TLS_KEY:'/u01/oracle/atg/data/certificates/node/certificados/newatg.key',
        // TLS_CERT:'/u01/oracle/atg/data/certificates/node/certificados/newatg.crt',
        // TLS_CA:'/u01/oracle/atg/data/certificates/node/certificados/newatginter.crt',
        // WS_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgWS.key',
        // WS_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgWS.crt',
        // WS_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterWS.crt',
        // WE_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPBWE.key',
        // WE_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgWE.crt',
        // WE_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterWE.crt',
        // PB_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPB.key',
        // PB_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgPB.crt',
        // PB_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterPB.crt',
        // PBT_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPBT.key',
        // PBT_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgPBT.crt',
        // PBT_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterPBT.crt',
        // PBK_TLS_KEY:'/u01/oracle/atg/data/certificates/node/newatgPBK.key',
        // PBK_TLS_CERT:'/u01/oracle/atg/data/certificates/node/newatgPBK.crt',
        // PBK_TLS_CA:'/u01/oracle/atg/data/certificates/node/newatginterPBK.crt',
        // COR_ID:'23f585945be2f',
        // AUTH_KEY:'DJK7uDwZx5O49dWfKE2tfuCPhr6Dqw%2F'
      },
      env_prod: {
        NODE_ENV: 'production',
        ENVIRONMENT:'prod',
        TLS_ENABLE:'false',
      }
    }

  ]
};
