module.exports = {
  commandOnly: true,
    name: "[XR]Store_command_params",
    displayName: "Store Command Parameters",
    section: '# XR - Message(s)',
    meta: {
        version: "3.2.0",
        actionVersion: "2.0.0",
        author: "xerune",
        authorUrl: "https://github.com/xerune/dbm-mods",
        downloadUrl: "https://github.com/xerune/dbm-mods",
    },

  subtitle(data, presets) {
    const infoSources = [
      "One Parameter",
      "Multiple Parameters",
      "Mentioned Member",
      "Mentioned Role",
      "Mentioned Channel",
      "Custom (use prefix)",
    ];
    return `${infoSources[parseInt(data.info, 10)]} #${data.infoIndex}`;
  },

  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    const info = parseInt(data.info, 10);
    let dataType = "None";
    switch (info) {
      case 0:
      case 1:
        dataType = "Text";
        break;
      case 2:
        dataType = "Server Member";
        break;
      case 3:
        dataType = "Role";
        break;
      case 4:
        dataType = "Channel";
        break;
      case 5:
        dataType = "Text";
        break;
    }
    return [data.varName, dataType];
  },

  fields: ["info", "infoIndex", "storage", "varName", "customPrefix"],

  html(isEvent, data) {
  const actionVersion = (this.meta && typeof this.meta.actionVersion !== "undefined") ? `${this.meta.actionVersion}` : "???";
  const actionFilename = (this.name ? this.name + ".js" : "[VX]store_server_info.js");
  window.__VX_ACTION_VERSION = actionVersion;
  window.__VX_ACTION_FILENAME = actionFilename;
    return `
        <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
          <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-author-name">Xerune</span></div>
          <a href="#" id="vx-discord-link" class="vcstatus-discord">Discord</a>
        </div>
        <div class="vcstatus-box-fixed vcstatus-box-right" style="top: 22px; right: 15px;">
          <span class="vcstatus-version">v${actionVersion}</span>
        </div>
        <div id="vx-version-warning" style="position:fixed; top:52px; right:218px; min-width:120px; max-width:320px; z-index:9999;"></div>
        <style>
          .vcstatus-author-label {
            color: #BDBDBD;
          }
          .vcstatus-author-name {
            color: #9040d1ff;
          }
          :root {
            --vcstatus-box-width: 64px;
            --vcstatus-box-height: 28px;
            --vcstatus-box-left-width: 110px;
            --vcstatus-box-left-height: 58px;
            --vcstatus-author-font-size: 14px;
            --vcstatus-discord-font-size: 14px;
            --vcstatus-author-margin-top: 0px;
            --vcstatus-discord-margin-top: -2px;
            --vcstatus-box-left-offset: 16px;
            --vcstatus-author-margin-left: 2px;
            --vcstatus-discord-margin-left: 10px;
          }
          .vcstatus-box-fixed {position:fixed;top:2px;z-index:9999;padding:5px 8px;border-radius:10px;font-size:14px;font-weight:bold;box-shadow:0 2px 10px rgba(0,0,0,0.10);border:1px solid #23272a;background:linear-gradient(90deg,#23243a 0%,#3a3b5a 100%);color:#fff;min-width:120px;max-width:320px;display:flex;flex-direction:column;margin-top:5px;align-items:flex-start;gap:4px;}
          .vcstatus-box-right {right:18px;justify-content:center;color:#ff4d4d;align-items:center;flex-direction:row;width:var(--vcstatus-box-width);min-width:var(--vcstatus-box-width);max-width:var(--vcstatus-box-width);padding:0;flex-shrink:0;font-size:16px;height:var(--vcstatus-box-height);margin-top:-0.5px;box-sizing:border-box;overflow:hidden;}
          .vcstatus-version {color:#9040d1ff;font-weight:bold;font-size:18px;margin:0;padding:0;line-height:1;letter-spacing:0;white-space:nowrap;min-width:0;max-width:100%;display:inline-block;overflow:hidden;text-overflow:ellipsis;}
          .vcstatus-box-left {left:var(--vcstatus-box-left-offset);width:var(--vcstatus-box-left-width);min-width:var(--vcstatus-box-left-width);max-width:var(--vcstatus-box-left-width);height:var(--vcstatus-box-left-height);}
          .vcstatus-author {color:#ff4d4d;font-weight:bold;font-size:var(--vcstatus-author-font-size);margin-bottom:2px;margin-top:var(--vcstatus-author-margin-top);margin-left:var(--vcstatus-author-margin-left);}
          .vcstatus-discord {color:#5865F2;background:#23272a;border-radius:5px;padding:2px 10px;text-decoration:none;font-weight:bold;font-size:var(--vcstatus-discord-font-size);margin-top:var(--vcstatus-discord-margin-top);margin-left:var(--vcstatus-discord-margin-left);transition:background 0.2s,color 0.2s;box-shadow:0 1px 4px rgba(88,101,242,0.08);}
          .vcstatus-discord:hover {background:#5865F2;color:#fff;text-decoration:underline;}
          .vcstatus-warning {background: linear-gradient(90deg, #890000 0%, #B57070 100%);border: 1px solid #5a2323;color: #fff;padding: 1px 2px;border-radius: 8px;margin-bottom: 8px;font-size: 11px;font-weight:bold;box-shadow: 0 2px 8px rgba(137,0,0,0.10);margin-top: 4px;text-align: center;}
          .dbminputlabel {color:#8754ffff;font-weight:bold;}
          input.round {border-radius:6px;border:1px solid #aaa;padding:6px 10px;font-size:14px;background:#21232B;transition:border-color 0.2s;}
          input.round:focus {border-color:#b595ffff;outline:none;}
        </style>

      <div>
        <div style="float: left; width: 35%;">
          <span class="dbminputlabel">Source Info</span><br>
          <select id="info" class="round" onchange="glob.onSourceInfoChanged(this)">
            <option value="0" selected>One Parameter</option>
            <option value="1">Multiple Parameters</option>
            <option value="2">Mentioned Member</option>
            <option value="3">Mentioned Role</option>
            <option value="4">Mentioned Channel</option>
            <option value="5">Custom (use prefix)</option>
          </select>
        </div>
        <div style="float: right; width: 60%;">
          <span class="dbminputlabel" id="infoCountLabel">Parameter Number:</span>
          <input id="infoIndex" class="round" type="text" value="1"><br>
        </div>
      </div>

      <div style="padding-top:8px;">
        <br><br><br>
        <span class="dbminputlabel">Custom Prefix</span><br>
        <input id="customPrefix" class="round" type="text" placeholder="ex. +rep" style="width:100%;">
      </div>

      <div style="padding-top:8px;">
        <br><br><br>
        <store-in-variable style="padding-top: 8px;" dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
      </div>
    `;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`, discordUrl = "https://discord.gg/XggyjAMFmC";
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}}); 
    const dLink = document.querySelector(".vcstatus-discord"); if(dLink) dLink.onclick=e=>{e.preventDefault();if(window.require){try{window.require('electron').shell.openExternal(discordUrl);}catch{window.open(discordUrl,'_blank');}}else window.open(discordUrl,'_blank');};
  },

  init() {
    const { glob, document } = this;

    glob.onSourceInfoChanged = function (event) {
      const value = parseInt(event.value, 10);
      const infoCountLabel = document.getElementById("infoCountLabel");
      const customPrefixInput = document.getElementById('customPrefix');
      switch (value) {
        case 0:
          infoCountLabel.innerHTML = "Parameter Number";
          break;
        case 1:
          infoCountLabel.innerHTML = "Starting From Parameter Number";
          break;
        case 2:
          infoCountLabel.innerHTML = "Member Mention Number";
          break;
        case 3:
          infoCountLabel.innerHTML = "Role Mention Number";
          break;
        case 4:
          infoCountLabel.innerHTML = "Channel Mention Number";
          break;
        case 5:
          infoCountLabel.innerHTML = "Parameter Number After Prefix";
          break;
        default:
          infoCountLabel.innerHTML = "";
          break;
      }

      if (customPrefixInput) {
        if (value === 5) customPrefixInput.parentElement.style.display = '';
        else customPrefixInput.parentElement.style.display = 'none';
      }
    };

    glob.onSourceInfoChanged(document.getElementById("info"));
  },

  action(cache) {
    const data = cache.actions[cache.index];
    const msg = cache.msg;
    const interactionOptions = cache.interaction?.options ?? null;
    if (!msg && !interactionOptions) {
      return this.callNextAction(cache);
    }

    const { Bot, Files } = this.getDBM();
    const infoType = parseInt(data.info, 10);
    const index = parseInt(this.evalMessage(data.infoIndex, cache), 10) - 1;
    
    let separator;
    let content = null;
    const getContent = () => {
      if (content === null) {
        separator = Files.data.settings.separator || "\\s+";
        Bot.populateTagRegex();
        content = msg.content?.replace(Bot.tagRegex, "").replace(Bot.checkTag(msg.content), "").trimStart();
      }
      return content;
    }

    let source;
    switch (infoType) {

      case 0: {
        if (interactionOptions) {
          const result = this.getParameterFromParameterData(interactionOptions.data[index]);
          if (result) {
            source = result;
          }
        } else if (msg && getContent()) {
          const params = content.split(new RegExp(separator));
          source = params[index] || "";
        }
        break;
      }

      case 1: {
        if (interactionOptions) {
          const result = [];
          for (let i = 0; i < index; i++) {
            const r = this.getParameterFromParameterData(interactionOptions.data[i]);
            if (r) {
              result.push(r);
            }
          }
          if (result.length > 0) {
            source = result;
          }
        } else if (msg && getContent()) {
          const params = content.split(new RegExp(separator));
          source = "";
          for (let i = 0; i < index; i++) {
            source += params[i] + " ";
          }
          const location = content.indexOf(source);
          if (location === 0) {
            source = content.substring(source.length);
          }
        }
        break;
      }

      case 2: {
        if (interactionOptions) {
          const options = interactionOptions.data.filter(option => option.type === "USER");
          if (options[index]) {
            source = options[index].member ?? options[index].user;
          }
        } else if (msg.mentions.members.size) {
          const members = [...msg.mentions.members.values()];
          if (members[index]) {
            source = members[index];
          }
        }
        break;
      }

      case 3: {
        if (interactionOptions) {
          const options = interactionOptions.data.filter(option => option.type === "ROLE");
          if (options[index]) {
            source = options[index].role;
          }
        } else if (msg.mentions.roles.size) {
          const roles = [...msg.mentions.roles.values()];
          if (roles[index]) {
            source = roles[index];
          }
        }
        break;
      }

      case 4: {
        if (interactionOptions) {
          const options = interactionOptions.data.filter(option => option.type === "CHANNEL");
          if (options[index]) {
            source = options[index].channel;
          }
        } else if (msg.mentions.channels.size) {
          const channels = [...msg.mentions.channels.values()];
          if (channels[index]) {
            source = channels[index];
          }
        }
        break;
      }

      case 5: {
        if (!interactionOptions && msg && getContent()) {
          const params = content.split(new RegExp(separator));
          const customPrefix = this.evalMessage(data.customPrefix || '', cache).trim();
          if (customPrefix) {
            const prefixIndex = params.findIndex(p => p === customPrefix);
            if (prefixIndex !== -1) {
              const desired = params[prefixIndex + 1 + index];
              if (desired !== undefined) {
                let m = null;
                if ((m = desired.match(/^<@!?(\d+)>$/))) {
                  const id = m[1];
                  const mem = (msg.mentions && msg.mentions.members && msg.mentions.members.get(id)) || (msg.guild && msg.guild.members && msg.guild.members.cache && msg.guild.members.cache.get(id));
                  source = mem || desired;
                } else if ((m = desired.match(/^<@&(\d+)>$/))) {
                  const id = m[1];
                  const role = (msg.mentions && msg.mentions.roles && msg.mentions.roles.get(id)) || (msg.guild && msg.guild.roles && msg.guild.roles.cache && msg.guild.roles.cache.get(id));
                  source = role || desired;
                } else if ((m = desired.match(/^<#(\d+)>$/))) {
                  const id = m[1];
                  const channel = (msg.mentions && msg.mentions.channels && msg.mentions.channels.get(id)) || (msg.guild && msg.guild.channels && msg.guild.channels.cache && msg.guild.channels.cache.get(id));
                  source = channel || desired;
                } else {
                  source = desired;
                }
              }
            }
          }
        }
        break;
      }

      default: {
        break;
      }
    }

    if (source) {
      const storage = parseInt(data.storage, 10);
      const varName = this.evalMessage(data.varName, cache);
      this.storeValue(source, storage, varName, cache);
    }

    this.callNextAction(cache);
  },

  mod() {},
};
