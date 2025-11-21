module.exports = {
  name: "[XR]Generate_Timestamp",
  displayName: "Generate Timestamp",
  section: "# XR - Time",
  meta: {
    version: "3.2.0",
    actionVersion: "3.6.0",
    preciseCheck: true,
    author: "Xerune",
    authorUrl: "https://github.com/xerune/dbm-mods",
    downloadUrl: "https://github.com/xerune/dbm-mods",
  },

  subtitle(data) {
    return "Generates a Discord timestamp in various formats";
  },

  variableStorage(data, varType) {
    if (parseInt(data.storage, 10) !== varType) return;
    return [data.varName, 'Timestamp'];
  },

  fields: [
    "current",
    "dateInput",
    "timeOffset",
    "manualInput",
    "standardFormatStyle",
    "manualFormatStyle",
    "storage",
    "varName",
  ],

  html(isEvent, data) {
  const actionVersion = (this.meta && typeof this.meta.actionVersion !== "undefined") ? `${this.meta.actionVersion}` : "???";
  const actionFilename = (this.name ? this.name + ".js" : "[VX]store_server_info.js");
  window.__VX_ACTION_VERSION = actionVersion;
  window.__VX_ACTION_FILENAME = actionFilename;
    return `
        <div class="vcstatus-box-fixed vcstatus-box-left" style="top: 2px;">
          <div class="vcstatus-author"><span class="vcstatus-author-label">Autor:</span> <span class="vcstatus-author-name">vxed_</span></div>
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
            --vcstatus-box-left-width: 100px;
            --vcstatus-box-left-height: 58px;
            --vcstatus-author-font-size: 14px;
            --vcstatus-discord-font-size: 14px;
            --vcstatus-author-margin-top: 0px;
            --vcstatus-discord-margin-top: -2px;
            --vcstatus-box-left-offset: 16px;
            --vcstatus-author-margin-left: 2px;
            --vcstatus-discord-margin-left: 5px;
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

      <tab-system id="timestamp-tabs" style="margin-top: 10px;">
        <tab label="Standard" icon="calendar">
          <div style="padding-top: 8px;">
            <dbm-checkbox id="current" label="Use Current Time"></dbm-checkbox>
          </div>
          <br>
          <div>
            <span class="dbminputlabel">Input Date (Optional)</span><br>
            <input id="dateInput" class="round" type="text" placeholder="Leave empty for current date if checkbox is checked">
          </div>
          <br>
          <div>
            <span class="dbminputlabel">Time Offset (e.g., 3m 53s or just 7 for days)</span><br>
            <input id="timeOffset" class="round" type="text" placeholder="Optional: Add or subtract time">
          </div>

          <div style="padding-top: 8px;">
            <span class="dbminputlabel">Date Format Style</span><br>
            <select id="standardFormatStyle" class="round">
              <option value="t">Short Time</option>
              <option value="T">Long Time</option>
              <option value="d">Short Date</option>
              <option value="D">Long Date</option>
              <option value="f">Short Date/Time</option>
              <option value="F">Long Date/Time</option>
              <option value="R" selected>Relative Time</option>
            </select>
          </div>
        </tab>

        <tab label="Manual Date String" icon="calendar">
          <div>
            <span class="dbminputlabel">Manual Date (e.g., Sat Nov 03 2018 19:24:28 GMT+0100)</span><br>
            <input id="manualInput" class="round" type="text" placeholder="Your full date string here">
          </div>

          <div style="padding-top: 8px;">
            <span class="dbminputlabel">Date Format Style</span><br>
            <select id="manualFormatStyle" class="round">
              <option value="t">Short Time</option>
              <option value="T">Long Time</option>
              <option value="d">Short Date</option>
              <option value="D">Long Date</option>
              <option value="f">Short Date/Time</option>
              <option value="F">Long Date/Time</option>
              <option value="R" selected>Relative Time</option>
            </select>
          </div>
        </tab>
      </tab-system>
      <div>
        <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        <store-in-variable dropdownLabel="Store Result In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
      </div>
    `;
  },

  preInit() {
    const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`, discordUrl = "https://discord.gg/XggyjAMFmC";
    fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}}); 
    const dLink = document.querySelector(".vcstatus-discord"); if(dLink) dLink.onclick=e=>{e.preventDefault();if(window.require){try{window.require('electron').shell.openExternal(discordUrl);}catch{window.open(discordUrl,'_blank');}}else window.open(discordUrl,'_blank');};
  },

  async action(cache) {
    const data = cache.actions[cache.index];
    const useCurrent = data.current === "true";
    const dateInput = this.evalMessage(data.dateInput, cache);
    const timeOffset = this.evalMessage(data.timeOffset, cache);
    const manualInput = this.evalMessage(data.manualInput, cache);

    const style = this.evalMessage(
        manualInput ? data.manualFormatStyle : data.standardFormatStyle,
        cache
    ) || "R";

    let baseTimestamp;

    if (manualInput) {
      const parsedManual = new Date(manualInput);
      if (isNaN(parsedManual.getTime())) {
        this.storeValue(
          "Invalid manual date",
          parseInt(data.storage),
          this.evalMessage(data.varName, cache),
          cache
        );
        return this.callNextAction(cache);
      }
      baseTimestamp = Math.floor(parsedManual.getTime() / 1000);
    } else if (useCurrent || !dateInput) {
      baseTimestamp = Math.floor(Date.now() / 1000);
    } else {
      const tryParseFlexible = (str) => {
        if (!str || typeof str !== 'string') return null;
        const s = str.trim();

        const m1 = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})\s*[\-–—]\s*(\d{1,2}):(\d{2})$/);
        if (m1) {
          const day = Number(m1[1]);
          const mon = Number(m1[2]) - 1;
          const yr = Number(m1[3]);
          const hh = Number(m1[4]);
          const mm = Number(m1[5]);
          return new Date(yr, mon, day, hh, mm);
        }

        const m2 = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})\s+(\d{1,2}):(\d{2})$/);
        if (m2) {
          const day = Number(m2[1]);
          const mon = Number(m2[2]) - 1;
          const yr = Number(m2[3]);
          const hh = Number(m2[4]);
          const mm = Number(m2[5]);
          return new Date(yr, mon, day, hh, mm);
        }

        const m3 = s.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
        if (m3) {
          const day = Number(m3[1]);
          const mon = Number(m3[2]) - 1;
          const yr = Number(m3[3]);
          return new Date(yr, mon, day);
        }

        const norm = s.includes(' ') ? s.replace(/\s+/g, 'T') : s;
        const d = new Date(norm);
        if (!isNaN(d.getTime())) return d;

        return null;
      };

      const parsedDate = tryParseFlexible(dateInput);
      if (!parsedDate || isNaN(parsedDate.getTime())) {
        this.storeValue(
          "Invalid input date",
          parseInt(data.storage),
          this.evalMessage(data.varName, cache),
          cache
        );
        return this.callNextAction(cache);
      }
      baseTimestamp = Math.floor(parsedDate.getTime() / 1000);
    }

    let offsetSeconds = 0;
    if (timeOffset && !manualInput) {
      const regex = /(-?\d+)([smhd])?/g;
      let match;
      while ((match = regex.exec(timeOffset)) !== null) {
        const value = parseInt(match[1], 10);
        const unit = match[2] || "d";
        switch (unit) {
          case "s":
            offsetSeconds += value;
            break;
          case "m":
            offsetSeconds += value * 60;
            break;
          case "h":
            offsetSeconds += value * 3600;
            break;
          case "d":
            offsetSeconds += value * 86400;
            break;
        }
      }
    }

    const finalTimestamp = baseTimestamp + offsetSeconds;
    const discordTimestamp = `<t:${finalTimestamp}:${style}>`;

    this.storeValue(
      discordTimestamp,
      parseInt(data.storage),
      this.evalMessage(data.varName, cache),
      cache
    );
    this.callNextAction(cache);
  },

  mod() {},
};