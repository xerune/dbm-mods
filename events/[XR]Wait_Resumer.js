module.exports = {
  name: "[XR] Wait Resumer",
  isEvent: true,

  fields: [],

  mod(DBM) {
    const { Bot, Actions } = DBM;
    const path = require("path");
    const fs = require("fs");
    const fsPromises = fs.promises;

    const statePath = path.join(process.cwd(), "data", "wait.json");

    async function loadAndSchedule() {
      try {
        const txt = await fsPromises.readFile(statePath, { encoding: 'utf8' });
        if (!txt) return;
        let obj;
        try {
          obj = JSON.parse(txt);
        } catch (err) {
          console.error('[Wait Resumer] Invalid JSON in wait.json:', err);
          return;
        }

        const entries = Array.isArray(obj) ? obj : [obj];

        console.log('[Wait Resumer] Loaded wait entries:', entries.length);
        for (const [i, e] of entries.entries()) {
          if (!e) continue;
          const end = e.endTimestamp || (e.startedAt + (e.duration || 0));
          const remaining = end - Date.now();

          const actionNameValue = e.actionName || e.name || e.ame || e.module || '';
          const uid = e.uid || null;
          const friendlyName = actionNameValue || (`wait_entry_${i}`) + (uid ? ` (${uid})` : '');

          const invokeResume = async () => {
            let current = null;
            try {
              const txt2 = await fsPromises.readFile(statePath, { encoding: 'utf8' });
              current = txt2 ? JSON.parse(txt2) : null;
            } catch (err) {
              if (err && err.code !== 'ENOENT') console.error('[Wait Resumer] Error re-reading wait.json before invoke:', err);
            }

            const possibleNames = ['[XR] Wait Resume', '[S] Wait Resume', '[VX] Wait Resume', '[Wait Resume]'];
            let evts = [];
            try {
              if (Bot.$evts) {
                for (const name of possibleNames) {
                  if (Bot.$evts[name]) evts = evts.concat(Bot.$evts[name]);
                }

                if (evts.length === 0) {
                  const allKeys = Object.keys(Bot.$evts || {});
                  const allEvents = [];
                  for (const k of allKeys) {
                    const list = Bot.$evts[k];
                    if (Array.isArray(list)) allEvents.push(...list);
                  }
                  const found = allEvents.filter(evt => {
                    try {
                      const n = (evt && evt.name) ? String(evt.name).toLowerCase() : '';
                      return n.includes('wait resume') || n.includes('wait_resum') || n.includes('waitresume');
                    } catch (err) { return false; }
                  });
                  if (found.length > 0) evts = evts.concat(found);
                  else {
                    for (const k of allKeys) {
                      const kn = String(k).toLowerCase();
                      if (kn.includes('wait resume') || kn.includes('wait_resum') || kn.includes('waitresume')) {
                        evts = evts.concat(Bot.$evts[k]);
                      }
                    }
                  }
                }
              }
            } catch (err) {
              console.error('[Wait Resumer] Error while scanning Bot.$evts for resume handlers:', err);
            }

            if (!evts || evts.length === 0) {
              console.warn('[Wait Resumer] No events registered for any resume name. Please create an event named one of: ' + possibleNames.join(', '));
              console.warn('[Wait Resumer] Available $evts keys: ', Bot.$evts ? Object.keys(Bot.$evts) : 'none');
              console.warn('[Wait Resumer] Keeping state for manual retry. Missing resume handler for entry:', friendlyName, e);
              return;
            }
            console.log('[Wait Resumer] Found', evts.length, 'resume handler(s) for entry', friendlyName);

            let resumed = false;
            try {
              if (e.actionsSnapshot && Array.isArray(e.actionsSnapshot) && typeof Actions.callNextAction === 'function') {
                try {
                  const cacheObj = { actions: JSON.parse(JSON.stringify(e.actionsSnapshot)), index: typeof e.index === 'number' ? e.index : 0 };
                  try {
                    if (e.cacheMeta && Bot.client) {
                      if (e.cacheMeta.serverId && Bot.client.guilds && Bot.client.guilds.cache) {
                        cacheObj.server = Bot.client.guilds.cache.get(e.cacheMeta.serverId) || null;
                      }
                      if (e.cacheMeta.channelId && Bot.client.channels && Bot.client.channels.cache) {
                        cacheObj.channel = Bot.client.channels.cache.get(e.cacheMeta.channelId) || null;
                      }
                    }
                  } catch (err) {}

                  console.log('[Wait Resumer] Attempting automatic resume for', friendlyName);
                  Actions.callNextAction(cacheObj);
                  resumed = true;
                  console.log('[Wait Resumer] Automatic resume succeeded for', friendlyName);
                } catch (err) {
                  resumed = false;
                  console.error('[Wait Resumer] Automatic resume failed for', friendlyName, err);
                }
              }
            } catch (err) {
              console.error('[Wait Resumer] Error during automatic resume attempt:', err);
            }

            if (!resumed) {
              for (const event of evts) {
                try {
                  const temp = {};
                  temp.wait_actionName = actionNameValue || e.actionName || e.name || e.ame || '';
                  if (uid) temp.wait_uid = uid;
                  temp.wait_index = e.index;
                  temp.wait_skipCount = e.skipCount;
                  temp.wait_executeBranch = e.executeBranch;
                  temp.wait_startedAt = e.startedAt;
                  temp.wait_duration = e.duration;
                  temp.wait_endTimestamp = e.endTimestamp || end;

                  Actions.invokeEvent(event, null, temp);
                  resumed = true;
                } catch (err) {
                  console.error('[Wait Resumer] Error invoking resume event:', err);
                }
              }
            }

            if (resumed) {
              try {
                if (!current) {
                } else {
                  const arr = Array.isArray(current) ? current : [current];
                  const updated = arr.filter(it => {
                    if (!it) return false;
                    if (uid && it.uid) return it.uid !== uid;
                    const sameStarted = (it.startedAt || 0) !== (e.startedAt || 0) ? false : true;
                    const sameIndex = (it.index || 0) !== (e.index || 0) ? false : true;
                    const itName = it.actionName || it.name || it.ame || '';
                    const sameName = itName !== (actionNameValue || e.actionName || e.name || e.ame || '') ? false : true;
                    return !(sameStarted && sameIndex && sameName);
                  });
                  if (updated.length === 0) {
                    try { await fsPromises.unlink(statePath); } catch (err) {}
                  } else {
                    await fsPromises.writeFile(statePath, JSON.stringify(updated.length === 1 ? updated[0] : updated, null, 2), { encoding: 'utf8' });
                  }
                }
              } catch (err) {
                console.error('[Wait Resumer] Error updating wait.json after invoke:', err);
              }

              console.log('[Wait Resumer] Resumed wait for', friendlyName, 'index', e.index);
            } else {
              console.warn('[Wait Resumer] Could not resume entry', friendlyName, '— keeping state for manual retry.');
            }
          };

          if (remaining <= 0) {
            console.log('[Wait Resumer] Resuming immediately for', friendlyName);
            invokeResume();
          } else {
            setTimeout(invokeResume, remaining);
            console.log('[Wait Resumer] Scheduled resume for', friendlyName, 'in', Math.ceil(remaining / 1000), 's');
          }
        }
      } catch (err) {
        if (err && err.code !== 'ENOENT') console.error('[Wait Resumer] Error loading wait.json:', err);
      }
    }

    const { onReady } = Bot;
    Bot.onReady = function (...params) {
      loadAndSchedule();
      if (onReady) onReady.apply(this, params);
    };
  },
};
