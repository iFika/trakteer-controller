const {Client} = require("discord.js")
require('dotenv').config({ path: `.env` })
let token = process.env.TOKEN_BOT
const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})
let realtime_console = false;
let trakteer_berhasil = 0;
let trakteer_gagal = 0;
//Module
const path = require("path")
const fs = require("fs")
const { mouse, left, right, up, down, straightTo, centerOf, Region, keyboard, Key, Button} = require("@nut-tree/nut-js");
load()
async function load()
{
const client = new Client({
    intents: ['DIRECT_MESSAGES', 'DIRECT_MESSAGE_REACTIONS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'GUILDS']
});

client.on('ready', async () => {
})
client.on("messageCreate", async function(message) {

if(message.channel.id == "1064233497344098465")
{
 if(message.embeds[0])
 {
 for(let embed of message.embeds) {
    if(!message.author.username.toLowerCase() == "trakteer-an") return;
    let data_fetch = embed.title?.replace("Trakteer", "").replace(" ", "")
    fs.readdir("./DATA/donasi/", async(err, files) => {
        var filter = files.filter(f => f.split(".").pop() === "json");
        for(i = 0; i < filter.length; i++)
        {
            try {
                const fileData = fs.readFileSync(path.join("./DATA/donasi/", filter[i]))
                const json = JSON.parse(fileData.toString())
                if(json.donasi?.toLowerCase() == data_fetch.toLowerCase())
                {
                    if(!fs.existsSync(`DATA/load_donasi/${json.name}.js`))
                    {
                       if(realtime_console) console.log(`[WARN] : Donasi menu tersedia Namun Scriptnya tidak berhasil dijalankan karena tidak tersedia di Folder Load_donasi! Silakan Perbaiki terlebih dahulu. - Berhasil : ${trakteer_berhasil} | Gagal : ${trakteer_gagal}`)
                    }
                    else {
fs.readFile(`DATA/load_donasi/${json.name}.js`, async(err, data) => {
    if(err) return err;
    eval(data.toString());
    trakteer_berhasil++
    if(realtime_console) console.log("\x1b[42m", `[!] Permintaan ${json.name} telah dilaksanakan! - Berhasil : ${trakteer_berhasil} | Gagal : ${trakteer_gagal}`)
})
                    }
                }
                
            }
            catch(e)
            {

            }
        }
    })
 }
 }
}
})
client.login(token);
menu_load()
}

async function menu_load()
{
console.log("\x1b[32m", `- Trakteer CONTROLLER OPEN SOURCE -
By : iFika

Menu Tersedia :
1. Opsi Donasi Tersedia
2. Realtime Console (Setelah memilih ini, harus membutuhkan restart program supaya kembali ke menu!)`)
rl.question(`Pilih Menu (1-2) > `, (data) => {
    if(data == 1) {
console.clear();
data_donasi()
    }
    else if (data == 2)
    {
        console.clear();
        realtime()
    }
    else {
console.clear()
menu_load()
    }
})
}

async function data_donasi()
{
    console.log(`Data Donasi yang tersedia : `)
    fs.readdir("./DATA/donasi", async(err, p) => {
var filter = p.filter(f => f.split(".").pop() == "json") //extension
for (i = 0; i < filter.length; i++)
{
    let peler = fs.readFileSync(path.join("./DATA/donasi/", filter[i]))
    const json = JSON.parse(peler.toString())
    console.log(`${json.name} - Donasi yang dibutuhkan : ${json.donasi} - Script Loaded : ${(!fs.existsSync(`./DATA/donasi/${filter[i]}`) ? `No` : `Yes`)} 
    `)
    if(i+1 === filter.length) {
      menu_load()
    }
}
    })
}

async function realtime()
{
    console.log("\x1b[35m", `[MODE CHANGED] Kamu Dalam Mode Realtime, Untuk Keluar kamu harus restart Program ini.
    Data Permintaan Akan Muncul disini!`)
      realtime_console = true;
      return;
}
