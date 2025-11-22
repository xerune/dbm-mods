module.exports = {
  name: "[XR]wait_plus_MOD",
  displayName: "Wait Plus",
  section: "# XR - Utilities",
  meta: {
    version: "3.2.0",
    actionVersion: "3.6.0",
    preciseCheck: true,
    author: "Xerune",
    authorUrl: "https://github.com/xerune/dbm-mods",
    downloadUrl: "https://github.com/xerune/dbm-mods",
  },

  subtitle(data, presets) {
    const measurements = ["Milliseconds", "Seconds", "Minutes", "Hours"];
    const timeText = `${data.time} ${measurements[parseInt(data.measurement, 10)]}`;
    
    const skipCount = parseInt(data.skipCount, 10) || 0;
    const branchExec = String(data.branchOption) === "1";
    const skipText = (branchExec && skipCount > 0) ? ` (Skip ${skipCount} action${skipCount > 1 ? 's' : ''})` : "";

    return timeText + skipText;
  },

  fields: ["time", "measurement", "branchOption", "skipCount"],

  html(isEvent, data) {
  const actionVersion = (this.meta && typeof this.meta.actionVersion !== "undefined") ? `${this.meta.actionVersion}` : "???";
  const actionFilename = (this.name ? this.name + ".js" : "[VX]store_server_info.js");
  window.__VX_ACTION_VERSION = actionVersion;
  window.__VX_ACTION_FILENAME = actionFilename;
    return `
        <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
          <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-author-name">Xerune</span></div>
          <a href="https://discord.gg/XggyjAMFmC" class="vcstatus-discord" target="_blank">Discord</a>
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
      <div style="float: left; width: 45%;">
        <span class="dbminputlabel">Measurement</span><br>
        <select id="measurement" class="round">
          <option value="0">Milliseconds</option>
          <option value="1" selected>Seconds</option>
          <option value="2">Minutes</option>
          <option value="3">Hours</option>
        </select>
      </div>
      <div style="float: right; width: 50%;">
        <span class="dbminputlabel">Amount</span><br>
        <input id="time" class="round" type="text">
      </div>
    </div>
    <br><br><br>

    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 5px;">
      <div style="flex: 0 0 45%;">
        <span class="dbminputlabel">Branch Option</span><br>
        <select id="branchOption" class="round">
          <option value="0" selected>No Execute Branch After Wait</option>
          <option value="1">Execute Branch After Wait</option>
        </select>
      </div>

      <div id="branchContainer" style="flex: 0 0 50%; display: none;">
        <span class="dbminputlabel">Number of actions to skip</span><br>
        <input id="skipCount" class="round" type="number" value="1">
      </div>
    </div>
    `;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`;
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}});
  },

  init() {
    const branchOption = document.getElementById("branchOption");
    const branchContainer = document.getElementById("branchContainer");

    if (branchOption && branchContainer) {
      const updateVisibility = () => {
        branchContainer.style.display = branchOption.value === "1" ? "block" : "none";
      };
      updateVisibility();
      branchOption.addEventListener("change", updateVisibility);
    }
  },

  action(cache) {
    const data = cache.actions[cache.index];
    let time = parseInt(this.evalMessage(data.time, cache), 10);
    const type = parseInt(data.measurement, 10);

    switch (type) {
      case 1: time *= 1e3; break;
      case 2: time *= 1e3 * 60; break;
      case 3: time *= 1e3 * 60 * 60; break;
    }

    const executeBranch = data.branchOption === "1";
    const skipCount = parseInt(data.skipCount, 10) || 0;
    let fs;
    let pathLib;
    let dataDir;
    let filePath;
    try {
      fs = require("fs");
      pathLib = require("path");
      dataDir = pathLib.join(__dirname, "..", "data");
      filePath = pathLib.join(dataDir, "wait.json");
      if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    } catch (e) {
      fs = null;
    }

    const saveState = (obj, cacheForSnapshot) => {
      if (!fs) return;
      try {
        const uid = obj.uid || `${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
        obj.uid = uid;
        try {
          if (cacheForSnapshot && Array.isArray(cacheForSnapshot.actions)) {
            obj.actionsSnapshot = JSON.parse(JSON.stringify(cacheForSnapshot.actions));
          }
        } catch (e) {
          obj.actionsSnapshot = undefined;
        }

        try {
          const meta = {};
          if (cacheForSnapshot) {
            if (cacheForSnapshot.server && (cacheForSnapshot.server.id || cacheForSnapshot.server.guildID)) {
              meta.serverId = cacheForSnapshot.server.id || cacheForSnapshot.server.guildID;
            }
            if (cacheForSnapshot.channel && (cacheForSnapshot.channel.id || cacheForSnapshot.channel.channelID)) {
              meta.channelId = cacheForSnapshot.channel.id || cacheForSnapshot.channel.channelID;
            }
            if (cacheForSnapshot.msg && (cacheForSnapshot.msg.id || cacheForSnapshot.msg.messageID)) {
              meta.messageId = cacheForSnapshot.msg.id || cacheForSnapshot.msg.messageID;
            }
          }
          obj.cacheMeta = meta;
        } catch (e) {}

        let existing = null;
        try {
          if (fs.existsSync(filePath)) {
            const txt = fs.readFileSync(filePath, { encoding: 'utf8' });
            existing = txt ? JSON.parse(txt) : null;
          }
        } catch (e) {
          existing = null;
        }

        let toWrite;
        if (!existing) {
          toWrite = obj;
        } else {
          const arr = Array.isArray(existing) ? existing : [existing];
          arr.push(obj);
          toWrite = arr;
        }

        fs.writeFileSync(filePath, JSON.stringify(toWrite, null, 2));
        return uid;
      } catch (err) {
        try { console.error("[VX]wait_plus_MOD - saveState error:", err); } catch (e) {}
      }
    };

    const removeState = (match) => {
      if (!fs) return;
      try {
        if (!fs.existsSync(filePath)) return;
        const txt = fs.readFileSync(filePath, { encoding: 'utf8' });
        if (!txt) return;
        let existing = JSON.parse(txt);
        const arr = Array.isArray(existing) ? existing : [existing];

        const updated = arr.filter(it => {
          if (!it) return false;
          if (match && match.uid) return it.uid !== match.uid;
          const itName = it.actionName || it.name || it.ame || '';
          const matchName = (match && (match.actionName || match.name || match.ame)) || objNameFallback(match);
          const sameStarted = (it.startedAt || 0) !== ((match && match.startedAt) || 0) ? false : true;
          const sameIndex = (it.index || 0) !== ((match && match.index) || 0) ? false : true;
          const sameName = itName !== (matchName || '') ? false : true;
          return !(sameStarted && sameIndex && sameName);
        });

        if (!updated || updated.length === 0) {
          try { fs.unlinkSync(filePath); } catch (e) {}
        } else {
          fs.writeFileSync(filePath, JSON.stringify(updated.length === 1 ? updated[0] : updated, null, 2));
        }
      } catch (err) {}
    };

    function objNameFallback(m) {
      if (!m) return '';
      return m.actionName || m.name || m.ame || '';
    }

    if (!executeBranch || skipCount === 0) {
      const startedAt = Date.now();
      const endTimestamp = startedAt + time;
      saveState({
        actionName: this.name,
        index: cache.index,
        endTimestamp,
        startedAt,
        duration: time,
        executeBranch,
        skipCount,
      }, cache);

      return setTimeout(() => {
        removeState({ actionName: this.name, index: cache.index, startedAt });
        this.callNextAction(cache);
      }, time).unref();
    }

    const normalFlowCache = Object.assign({}, cache);
    normalFlowCache.index += skipCount;
    this.callNextAction(normalFlowCache);

    const startedAt = Date.now();
    const endTimestamp = startedAt + time;
    saveState({
      actionName: this.name,
      index: cache.index,
      endTimestamp,
      startedAt,
      duration: time,
      executeBranch,
      skipCount,
    }, cache);

    setTimeout(() => {
      removeState({ actionName: this.name, index: cache.index, startedAt });
      const skippedActionCache = Object.assign({}, cache, { index: cache.index + 1 });
      this.callNextAction(skippedActionCache);
    }, time).unref();
  },

  mod() {},
};
