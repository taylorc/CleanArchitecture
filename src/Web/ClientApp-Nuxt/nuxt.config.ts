// https://nuxt.com/docs/api/configuration/nuxt-config
const path = require('path');
const fs = require('fs');

const baseFolder =
  process.env.APPDATA !== undefined && process.env.APPDATA !== ''
    ? `${process.env.APPDATA}/ASP.NET/https`
    : `${process.env.HOME}/.aspnet/https`;

const certificateArg = process.argv.map(arg => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
const certificateName = certificateArg ? certificateArg.groups === undefined ? process.env.npm_package_name : certificateArg.groups.value : process.env.npm_package_name;
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    https: {
      key: keyFilePath,
      cert: certFilePath
      
    },
    port: 44447
  }
})
