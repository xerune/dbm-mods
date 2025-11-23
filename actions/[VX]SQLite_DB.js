module.exports = {
    name: "[VX]SQLite_DB",
    displayName: "SQLite - Local Database",
    section: '# VX - Utilities',
    meta: {
        version: "3.2.0",
        actionVersion: "3.9.0",
        author: "xerune",
        authorUrl: "https://github.com/vxe3D/dbm-mods",
        downloadUrl: "https://github.com/vxe3D/dbm-mods",
    },
    subtitle(data) {
        const opMap = {
            store: 'Store',
            update: 'Update/Save',
            delete: 'Delete',
            count: 'Count Values',
            checkvar: 'Check Variable',
            countList: 'Count List',
            search: 'Search in'
        };
        const opLabel = opMap[data.dboperation] || data.dboperation;
        let tableName = data.tableName || '';
        if (tableName && !tableName.endsWith('.sqlite')) tableName += '.sqlite';
        let varName = data.varName || '';
        if (['store', 'count', 'update', 'delete', 'countList', 'checkvar', 'search'].includes(data.dboperation)) {
            let parts = [opLabel];
            if (tableName) parts.push(`File: ${tableName}`);
            if (varName) parts.push(varName);
            return parts.join(' | ');
        }
        return `${opLabel}`;
    },

    variableStorage(data, varType) {
        if (parseInt(data.storage, 10) !== varType) return;
        return [data.varName, 'Database'];
    },

    fields: ['dboperation', 'collection', 'key', 'fieldName', 'value', 'searchQuery', 'searchByIndex', 'storeKey', 'storeCollection', 'debugMode', 'tableName', 'storage', 'varName', 'deleteCollection', 'deleteColumnsToClear', 'deleteKey', 'getColumn', 'conditionColumn', 'conditionValue', 'countColumn', 'comparison', 'branch', 'checkvarConditionColumn', 'checkvarGetColumn', 'checkvarConditionValue', 'checkvarComparison', 'checkvarValue', 'countListMatchColumn', 'countListCheckValue', 'countListColumn', 'searchReturnColumn', 'searchListColumn', 'searchValue', 'leaderColStore', 'leaderValueStore', 'leaderColGet', 'leaderColMatch', 'leaderShowNumbers', 'leaderCharAfter', 'leaderStartText', 'leaderMiddleText', 'leaderEndText', 'leaderSortType', 'leaderResultLimit'],

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

        <tab-system id="tabs" style="margin-top: -30px;">
            <tab label="SQLite" icon="database">
                <div style="margin-bottom: 12px;">
                    <span class="dbminputlabel">Operation</span>
                    <select id="dboperation" class="round">
                        <option value="checkvar">Check Variable</option>
                        <option value="search">Search in</option>
                        <option value="store">Store</option>
                        <option value="update">Update/Save</option>
                        <option value="delete">Delete</option>
                        <option value="countList">Count List</option>
                        <option value="count">Count Values</option>
                        <option value="leaderboard">Leaderboard</option>
                    </select>
                <div id="countFieldsDiv" style="margin-top: 10px; margin-bottom: 10px; display:none;">
                    <span class="dbminputlabel">Column to count values</span>
                    <input id="countColumn" class="round" type="text" placeholder="ex. Age">
                </div>
                <div id="countListFieldsDiv" style="margin-top: 10px; margin-bottom: 10px; display:none; width: 100%;">
                    <div style="float: left; width: 32%;">
                        <span class="dbminputlabel">Column to match</span>
                        <input id="countListMatchColumn" class="round" type="text" placeholder="ex. ID">
                    </div>
                    <div style="float: left; width: 32%; margin-left: 2%;">
                        <span class="dbminputlabel">Column to check</span>
                        <input id="countListCheckValue" class="round" type="text" placeholder="ex. 1">
                    </div>
                    <div style="float: left; width: 32%; margin-left: 2%;">
                        <span class="dbminputlabel">Column to count</span>
                        <input id="countListColumn" class="round" type="text" placeholder="ex. Users">
                    </div>
                    <div style="clear: both;"></div>
                </div>
                <div id="SearchFieldsDiv" style="margin-top: 10px; margin-bottom: 10px; display:none; width: 100%;">
                    <div style="float: left; width: 60%;">
                        <span class="dbminputlabel">Column to match</span>
                        <span class="dbminputlabel"><b>Jak używać? - <u>Search</u></b>
                        <help-icon dialogTitle="[Local Database] How to use this function" dialogWidth="640" dialogHeight="700">
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column to check</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz nazwę kolumny, w której ma szukać użytkownika</li>
                                </ul>
                            </div>
                            </div>

                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Value to find</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz wartość, której szukasz w kolumnie "Column to check"</li>
                                </ul>
                            </div>
                            </div>

                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column to match</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz nazwę kolumny - np. w ID znajduje się użytkownik <b>1</b> i przypisana do niego osoba to <b>2</b> - jeśli poprawnie podasz kolumnę to wtedy wskaże osobę <b>1</b><br><br>Osobą <b>2</b> jest użytkownik którego wskazujesz w "Value to Find"</li>
                                </ul>
                            </div>
                            </div>

                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px; margin-top: 200px;">
                            <b><span style="font-size: 15px;">⚠️ <u>W razie problemów...</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Skontaktuj się ze mną na Discordzie <u>DBM Polska</u> lub w <u>wiadomości prywatnej</u> (<b>vxed_</b>)</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Czwarte okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-top: 10px;">
                            <b><span style="font-size: 15px;">🚨 <u>Znalazłeś błąd?</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Zgłoś problem na Discordzie w wiadomości prywatnej <b><u>vxed_</b></u> - zazwyczaj odpowiadam do godziny.</li>
                                </ul>
                            </div>
                            </div>
                        </help-icon>
                        </span>
                        <input id="searchReturnColumn" class="round" type="text" placeholder="ex. ID">
                    </div>
                    <div style="float: right; width: 30%;">
                        <span class="dbminputlabel">Column to check</span>
                        <input id="searchListColumn" class="round" type="text" placeholder="ex. Users">
                    </div>
                    <br><br><br>
                    <div style="width: 100%; margin-top: 10px;">
                        <span class="dbminputlabel">Value to find</span>
                        <input id="searchValue" class="round" type="text" placeholder="ex. 594974899513327617" style="width: 100%;">
                    </div>
                </div>
                <div id="leaderboardFieldsDiv" style="margin-top: 10px; margin-bottom: 10px; display:none; width: 100%;">
                    <div style="float: left; width: 48%;">
                        <span class="dbminputlabel">Column to store</span>
                        <input id="leaderColStore" class="round" type="text" placeholder="ex. Score">
                    </div>
                    <div style="float: right; width: 48%;">
                        <span class="dbminputlabel">Value to store</span>
                        <input id="leaderValueStore" class="round" type="text" placeholder="ex. 123">
                    </div>
                    <div style="clear: both;"></div>
                    <div style="float: left; width: 48%; margin-top: 6px;">
                        <span class="dbminputlabel">Column to get</span>
                        <input id="leaderColGet" class="round" type="text" placeholder="ex. Name">
                    </div>
                    <div style="float: right; width: 48%; margin-top: 6px;">
                        <span class="dbminputlabel">Column to match</span>
                        <input id="leaderColMatch" class="round" type="text" placeholder="ex. ID">
                    </div>
                    <div style="clear: both;"></div>
                    <hr class="subtlebar" style="margin-top: 8px; margin-bottom: 8px; width: 100%;">
                    <div style="display:flex; gap:12px; flex-wrap:wrap;">
                        <div style="flex:1; min-width:140px;">
                            <span class="dbminputlabel">Show Numbers</span>
                            <select id="leaderShowNumbers" class="round">
                                <option value="true" selected>Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <div style="flex:1; min-width:140px;">
                            <span class="dbminputlabel">Character after number</span>
                            <input id="leaderCharAfter" class="round" type="text" placeholder="ex. .">
                        </div>
                        <div style="flex:1; min-width:160px;">
                            <span class="dbminputlabel">Start Text</span>
                            <input id="leaderStartText" class="round" type="text" placeholder="ex. Top players:">
                        </div>
                        <div style="flex:1; min-width:160px;">
                            <span class="dbminputlabel">Middle Text</span>
                            <input id="leaderMiddleText" class="round" type="text" placeholder="ex. - ">
                        </div>
                        <div style="flex:1; min-width:160px;">
                            <span class="dbminputlabel">End Text</span>
                            <input id="leaderEndText" class="round" type="text" placeholder="ex. pts">
                        </div>
                        <div style="flex:1; min-width:140px;">
                            <span class="dbminputlabel">Sort Type</span>
                            <select id="leaderSortType" class="round">
                                <option value="desc" selected>Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>
                        <div style="flex:1; min-width:120px;">
                            <span class="dbminputlabel">Result Limit</span>
                            <input id="leaderResultLimit" class="round" type="text" placeholder="ex. 10">
                        </div>
                    </div>
                </div>
                <div id="checkVarFieldsDiv" style="margin-bottom: 10px; display:none; width: 100%; overflow: hidden;">
                    <div style="float: left; width: 48%;">
                        <span class="dbminputlabel">Column to match</span>
                        <input id="checkvarConditionColumn" class="round" type="text" placeholder="ex. ID">
                        <span class="dbminputlabel" style="margin-top: 4px; display: inline-block;">Column to check</span>
                        <input id="checkvarGetColumn" class="round" type="text" placeholder="ex. Age">
                    </div>
                    <div style="float: right; width: 48%;">
                        <span class="dbminputlabel">Column value to match</span>
                        <input id="checkvarConditionValue" class="round" type="text" placeholder="ex. 123456789">
                        <span class="dbminputlabel" style="margin-top: 4px; display: inline-block;">Comparison Type</span>
                        <select id="checkvarComparison" class="round">
                            <option value="0">Exists</option>
                            <option value="1" selected>Equals</option>
                            <option value="2">Equals Exactly</option>
                            <option value="12">Not equals</option>
                            <option value="3">Less Than</option>
                            <option value="4">Greater Than</option>
                            <option value="5">Includes</option>
                            <option value="6">Matches Regex</option>
                            <option value="7">Starts With</option>
                            <option value="8">Ends With</option>
                            <option value="9">Length Equals</option>
                            <option value="10">Length is Greater Than</option>
                            <option value="11">Length is Less Than</option>
                        </select>
                        <span class="dbminputlabel" style="margin-top: 4px; display: inline-block;">Value to Compare to</span>
                        <input id="checkvarValue" style="margin-bottom: -5px;" class="round" type="text" name="is-eval" placeholder="Value (optional)">
                    </div>
                    <div style="clear: both;"></div>
                    <hr class="subtlebar">
                    <conditional-input id="branch"></conditional-input>
                </div>
                </div>
                <div id="updateFieldsDiv" style="margin-bottom: 10px; display:none;">
                    <span class="dbminputlabel">Column to update</span>
                    <span class="dbminputlabel"><b>Jak używać? - <u>Update/Save</u></b>
                      <help-icon dialogTitle="[Local Database] How to use this function" dialogWidth="640" dialogHeight="800">
                        <div style="padding: 16px;">
                            <!-- Pierwsze okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column to update</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz kolumnę którą chcesz utworzyć lub dodać do niej wartość</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Drugie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Value to update</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz dane które chcesz wprowadzić do tej kolumny</li>
                                <br>
                                <li>Za pomocą | ^+1 lub ^-1 | możesz zamieszczać elementy jako tablice, przydatne do np. zapisywania id osób gdy się robi dynamiczne permisje</li>
                                <br>
                                <li>Za pomocą | +1 lub -1 | możesz dodawać / odejmować wartości np. masz w bazie liczbe 3 to po wpisaniu -1 będziesz miał wynik 2 :)
                                </ul>
                            </div>
                            </div>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column to match</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz np. kolumnę z ID użytkownika - przejdź do następnego punktu aby dowiedzieć się o co w tym chodzi</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Czwarte okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column value to match</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Kontynuując - chodzi o np. wyszukanie użytkownika w tabeli po jego ID, wpisujesz w <b>"Column to match"</b> <u>"ID"</u> i w tym polu którym opisuje, wprowadzasz ID użytkownika za pomocą np. zmiennej i w ten sposób aktualizujesz dane - danego użytkownika.</li>
                                </ul>
                            </div>
                            </div>
                            <br><br>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px; margin-top: 70px;">
                            <b><span style="font-size: 15px;">⚠️ <u>W razie problemów...</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Skontaktuj się ze mną na Discordzie <u>DBM Polska</u> lub w <u>wiadomości prywatnej</u> (<b>vxed_</b>)</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Czwarte okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-top: 10px;">
                            <b><span style="font-size: 15px;">🚨 <u>Znalazłeś błąd?</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Zgłoś problem na Discordzie w wiadomości prywatnej <b><u>vxed_</b></u> - zazwyczaj odpowiadam do godziny.</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                      </help-icon>
                    </span>
                    <a href="https://github.com/sqlitebrowser/sqlitebrowser/releases/download/v3.13.1/DB.Browser.for.SQLite-v3.13.1-win64.msi" target="_blank" style="color:#4ea1ff;cursor:pointer;text-decoration:underline;font-weight:bold;margin-left: 10px;">Polecany program do DB</a>
                    <input id="collection" class="round" type="text" placeholder="ex. Age,Name">
                    <span class="dbminputlabel" style="margin-top: 4px; display: inline-block;">Value to update</span>
                    <input id="key" class="round" type="text" placeholder="ex. 1,20,Test | ex. +1 or -1 | ex. ^+1 or ^-1">
                </div>
                <div id="storeFieldsDiv" style="margin-bottom: 10px; display:none;">
                    <span class="dbminputlabel">Column(s) to store</span>
                    <span class="dbminputlabel"><b>Jak używać? - <u>Store</u></b>
                      <help-icon dialogTitle="[Local Database] How to use this function" dialogWidth="640" dialogHeight="700">
                        <div style="padding: 16px;">
                            <!-- Pierwsze okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column(s) to store</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz z której kolumny ma pobrać dane np. ID</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Drugie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Value(s) to store</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym miejscu zamieszczasz np. ID Użytkownika >> przejdź do następnego punktu</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column to get</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>I gdy wprowadzisz w "<b>Value(s) to store</b>" - np. ID użytkownika a w tym miejscu np. "Age" to pobierze dane z kolumny tego użytkownika - Gdy nie ma danych w danej kolumnie u użytkownika wyświetli się "<u>Brak danych</u>"</li>
                                </ul>
                            </div>
                            </div>
                            <br><br>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px; margin-top: 170px;">
                            <b><span style="font-size: 15px;">⚠️ <u>W razie problemów...</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Skontaktuj się ze mną na Discordzie <u>DBM Polska</u> lub w <u>wiadomości prywatnej</u> (<b>vxed_</b>)</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Czwarte okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px; margin-top: 10px;">
                            <b><span style="font-size: 15px;">🚨 <u>Znalazłeś błąd?</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Zgłoś problem na Discordzie w wiadomości prywatnej <b><u>vxed_</b></u> - zazwyczaj odpowiadam do godziny.</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                      </help-icon>
                    </span>
                    <a href="https://github.com/sqlitebrowser/sqlitebrowser/releases/download/v3.13.1/DB.Browser.for.SQLite-v3.13.1-win64.msi" target="_blank" style="color:#4ea1ff;cursor:pointer;text-decoration:underline;font-weight:bold;margin-left: 10px;">Polecany program do DB</a>
                    <input id="storeCollection" class="round" type="text" placeholder="ex. Age,Name">
                    <br>
                    <span class="dbminputlabel">Value(s) to store</span>
                    <input id="storeKey" class="round" type="text" placeholder="ex. 1,20,Test or [all]">
                    <hr class="subtlebar" style="margin-top: 8px; margin-bottom: 4px; width: 100%;">
                    <span class="dbminputlabel" style="margin-top: 4px; display: inline-block;">Column to get</span>
                    <input id="getColumn" class="round" type="text" placeholder="ex. Age">
                </div>
                <div id="deleteFieldsDiv" style="margin-bottom: 10px; display:none;">
                    <span class="dbminputlabel">Column(s) to match</span>
                    <span class="dbminputlabel"><b>Jak używać? - <u>Delete</u></b>
                      <help-icon dialogTitle="[Local Database] How to use this function" dialogWidth="640" dialogHeight="700">
                        <div style="padding: 16px;">
                            <!-- Pierwsze okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column(s) to match</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz kolumnę z której ma usunąć dane [np. ID]</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Drugie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Value(s) to match</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>W tym polu zamieszczasz [np. ID użytkownika]</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Column(s) to clear (optional)</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>A tutaj zamieszczasz którą kolumnę ma usunąć danemu użytkownikowi [np. Age] - gdy wskażesz "<b>Age</b>" to wtedy usunie tylko dane z tej kolumny, gdy nie wskażesz nic - usunie ci cały wynik z "<b>Value(s) to match</b>"</li>
                                </ul>
                            </div>
                            </div>
                            <br><br>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px; margin-top: 170px;">
                            <b><span style="font-size: 15px;">⚠️ <u>W razie problemów...</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Skontaktuj się ze mną na Discordzie <u>DBM Polska</u> lub w <u>wiadomości prywatnej</u> (<b>vxed_</b>)</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Czwarte okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px; margin-top: 10px;">
                            <b><span style="font-size: 15px;">🚨 <u>Znalazłeś błąd?</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Zgłoś problem na Discordzie w wiadomości prywatnej <b><u>vxed_</b></u> - zazwyczaj odpowiadam do godziny.</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                      </help-icon>
                    </span>
                    <a href="https://github.com/sqlitebrowser/sqlitebrowser/releases/download/v3.13.1/DB.Browser.for.SQLite-v3.13.1-win64.msi" target="_blank" style="color:#4ea1ff;cursor:pointer;text-decoration:underline;font-weight:bold;margin-left: 10px;">Polecany program do DB</a>
                    <input id="deleteCollection" class="round" type="text" placeholder="ex. Age,Name">
                    <span class="dbmininputlabel" style="margin-top: 4px; display: inline-block;">Value(s) to match</span>
                    <input id="deleteKey" class="round" type="text" placeholder="ex. 1,20,Test">
                    <hr class="subtlebar" style="margin-top: 8px; margin-bottom: 4px; width: 100%;">
                    <span class="dbminputlabel" style="margin-top: 4px; display: inline-block;">Column(s) to clear (optional)</span>
                    <input id="deleteColumnsToClear" class="round" type="text" placeholder="ex. Age">
                </div>
                <div id="updateConditionDiv" style="margin-bottom: 10px; display:none;">
                    <hr class="subtlebar" style="margin-top: 8px; margin-bottom: 8px; width: 100%;">
                    <span class="dbminputlabel">Column to match</span>
                    <input id="conditionColumn" class="round" type="text" placeholder="ex. ID">
                    <span class="dbminputlabel" style="margin-top: 4px; display: inline-block;">Column value to match</span>
                    <input id="conditionValue" class="round" type="text" placeholder="ex. 594974899513327617 or [next]">
                </div>
            </tab>

            <tab label="Settings" icon="settings">
                <div style="margin-bottom: 10px;">
                    <span class="dbminputlabel">File name
                      <help-icon dialogTitle="[Local Database] How to use this function" dialogWidth="640" dialogHeight="500">
                        <div style="padding: 16px;">
                            <!-- Pierwsze okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>How to use this function?</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>This field is used to change the name of the table where you want to insert data. For example, if you want to save a list of automatic channels, you can create a table named "channels" to avoid storing too much information in a single table.</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Drugie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">📖 <u>Jak używać tej funkcji?</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>To pole służy do zmiany nazwy tabeli, do której chcesz wprowadzać dane. Na przykład, jeśli chcesz zapisać listę kanałów automatycznych, możesz utworzyć tabelę o nazwie „channels”, aby uniknąć przechowywania zbyt wielu informacji w jednej tabeli.</li>
                                </ul>
                            </div>
                            </div>
                            <br><br>
                            <!-- Trzecie okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">⚠️ <u>W razie problemów...</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Skontaktuj się ze mną na Discordzie <u>DBM Polska</u> lub w <u>wiadomości prywatnej</u> (<b>vxed_</b>)</li>
                                </ul>
                            </div>
                            </div>
                            <!-- Czwarte okienko -->
                            <div style="background-color:rgba(0, 0, 0, 0.41); border: 2px solid rgba(255, 255, 255, 0.5); padding: 10px; border-radius: 5px; margin-bottom: 10px;">
                            <b><span style="font-size: 15px;">🚨 <u>Znalazłeś błąd?</span></b></u><br>
                            <div style="display: flex; gap: 20px;">  
                                <ul style="flex: 1;  padding-left: 20px; margin: 0;">
                                <li>Zgłoś problem na Discordzie w wiadomości prywatnej <b><u>vxed_</b></u> - zazwyczaj odpowiadam do godziny.</li>
                                </ul>
                            </div>
                            </div>
                        </div>
                      </help-icon>
                    </span>
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
                        <div style="flex: 1; float: left;">
                            <input id="tableName" class="round" type="text" placeholder="ex. users">
                        </div>
                        <div style="float: right;">
                            <dbm-checkbox id="debugMode" selectWidth="100%" variableInputWidth="100%" label="Debug Mode"></dbm-checkbox>
                        </div>
                    </div>
                    <div id="storeInVariableDiv">
                        <br>
                        <store-in-variable dropdownLabel="Store In" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>
                    </div>
                </div>
            </tab>
        </tab-system>
        `;
    },

    //////////////////////////////////////////////////
    // region ✨ | Init HTML
    //////////////////////////////////////////////////

    preInit() {
      const f = window.__VX_ACTION_FILENAME||"[VX]store_server_info.js", l = window.__VX_ACTION_VERSION||"0.0.0", c = (a,b) => {a=a.split('.').map(Number),b=b.split('.').map(Number);for(let i=0;i<Math.max(a.length,b.length);i++){let n1=a[i]||0,n2=b[i]||0;if(n1!==n2)return n1-n2;}return 0;}, githubUrl = `https://github.com/vxe3D/dbm-mods/blob/main/actions%2F${encodeURIComponent(f)}`, discordUrl = "https://discord.gg/XggyjAMFmC";
      fetch("https://github.com/vxe3D/dbm-mods/raw/main/Versions/versions.json").then(r=>r.json()).then(j=>{const v=j[f]?.version;if(v&&c(l,v)<0){document.getElementById("vx-version-warning").innerHTML="<button class='vcstatus-warning' id='vx-version-btn' type='button'>Masz nieaktualną wersję</button>";setTimeout(()=>{const b=document.getElementById('vx-version-btn');if(b)b.onclick=e=>{e.preventDefault();const u=githubUrl;if(window.require)try{window.require('electron').shell.openExternal(u);}catch{window.open(u,'_blank');}else window.open(u,'_blank');};},0);}}); 
      const dLink = document.querySelector(".vcstatus-discord"); if(dLink) dLink.onclick=e=>{e.preventDefault();if(window.require){try{window.require('electron').shell.openExternal(discordUrl);}catch{window.open(discordUrl,'_blank');}}else window.open(discordUrl,'_blank');};
    },

    init() {
        let debugMode = false;
        const { document } = this;
        function updateVisibility(id, visible) {
            const el = document.getElementById(id);
            if (el) el.style.display = visible ? null : 'none';
        }
        function updateFields() {
            const op = document.getElementById('dboperation').value;
            updateVisibility('updateFieldsDiv', false);
            updateVisibility('getColumnDiv', false);
            updateVisibility('storeFieldsDiv', false);
            updateVisibility('deleteFieldsDiv', false);
            updateVisibility('updateConditionDiv', false);
            updateVisibility('countFieldsDiv', false);
            updateVisibility('countListFieldsDiv', false);
            updateVisibility('leaderboardFieldsDiv', false);
            updateVisibility('checkVarFieldsDiv', false);
            updateVisibility('SearchFieldsDiv', false);

            const debugCheckbox = document.getElementById('debugMode');
            debugMode = debugCheckbox && debugCheckbox.checked;
            const data = window.currentActionData || {};
            data.debugMode = debugMode;
            window.currentActionData = data;

            const storeInVarDiv = document.getElementById('storeInVariableDiv');
            if (storeInVarDiv) {
                if (op === 'store' || op === 'count' || op === 'countList' || op === 'search' || op === 'leaderboard') {
                    storeInVarDiv.style.display = '';
                } else {
                    storeInVarDiv.style.display = 'none';
                }
            }

            if (op === 'update') {
                updateVisibility('updateFieldsDiv', true);
                updateVisibility('updateConditionDiv', true);
            } else if (op === 'get') {
                updateVisibility('getColumnDiv', true);
            } else if (op === 'leaderboard') {
                updateVisibility('leaderboardFieldsDiv', true);
            } else if (op === 'store') {
                updateVisibility('storeFieldsDiv', true);
            } else if (op === 'delete') {
                updateVisibility('deleteFieldsDiv', true);
            } else if (op === 'count') {
                updateVisibility('countFieldsDiv', true);
            } else if (op === 'countList') {
                updateVisibility('countListFieldsDiv', true);
            } else if (op === 'checkvar') {
                updateVisibility('checkVarFieldsDiv', true);
            } else if (op === 'search') {
                updateVisibility('SearchFieldsDiv', true);
            }
        }
        document.getElementById('dboperation').addEventListener('change', updateFields);
        updateFields();

        const debugCheckbox = document.getElementById('debugMode');
        if (debugCheckbox) {
          debugCheckbox.addEventListener('change', function() {
            debugMode = debugCheckbox.checked;
            const data = window.currentActionData || {};
            data.debugMode = debugMode;
            window.currentActionData = data;
          });
        }

        const helpBtn = document.getElementById('updateHelpBtn');
        const helpIcon = document.getElementById('updateHelpIcon');
        if (helpBtn && helpIcon) {
            helpBtn.addEventListener('click', function() {
                helpIcon.click();
            });
        }
    },

    //////////////////////////////////////////////////
    // region 🛠️ | Code SQLite
    //////////////////////////////////////////////////

    async action(cache) {
        const data = cache.actions[cache.index];
        const dboperation = data.dboperation;
        const tableNameRaw = this.evalMessage(data.tableName, cache);
        let tableName = tableNameRaw && tableNameRaw.trim() !== '' ? tableNameRaw.trim() : 'db';
        if (!tableName.endsWith('.sqlite')) tableName += '.sqlite';
        let columnsRaw, valuesRaw;
        if (dboperation === 'store') {
            columnsRaw = this.evalMessage(data.storeCollection, cache);
            valuesRaw = this.evalMessage(data.storeKey, cache);
        } else if (dboperation === 'delete') {
            columnsRaw = this.evalMessage(data.deleteCollection, cache);
            valuesRaw = this.evalMessage(data.deleteKey, cache);
        } else {
            columnsRaw = this.evalMessage(data.collection, cache);
            valuesRaw = this.evalMessage(data.key, cache);
        }
        const conditionColumn = this.evalMessage(data.conditionColumn, cache);
        const conditionValue = this.evalMessage(data.conditionValue, cache);
        const fs = require('fs');
        const path = require('path');
        const sqlite3 = require('sqlite3').verbose();
        const dbDir = path.join(process.cwd(), 'Database');
        const countColumn = this.evalMessage(data.countColumn, cache);

        let debugMode = false;
        if (typeof data.debugMode === 'boolean') debugMode = data.debugMode;
        else if (typeof data.debugMode === 'string') debugMode = data.debugMode === 'true';

        if (!fs.existsSync(dbDir)) {
            try {
                fs.mkdirSync(dbDir, { recursive: true });
                if (debugMode) console.log(`[sqlite3] Utworzono folder Database: ${dbDir}`);
            } catch (err) {
                console.error(`[sqlite3] Nie można utworzyć folderu Database: ${dbDir}`, err);
            }
        }
        const dbPath = path.join(dbDir, tableName);
        let db = new sqlite3.Database(dbPath);
        let output;

        function quoteId(name) {
            if (!name && name !== 0) return '""';
            const n = String(name);
            return '"' + n.replace(/"/g, '""') + '"';
        }
        async function ensureTableExists(db, tableName, columns) {
            if (!columns || columns.length === 0) columns = ['id']; // minimum column
            const tableNoExt = tableName.replace('.sqlite','');
            const createCols = columns.map(col => `\`${col}\` TEXT`).join(', ');
            const createTableSQL = `CREATE TABLE IF NOT EXISTS "${tableNoExt}" (${createCols})`;
            return new Promise((resolve, reject) => {
                db.run(createTableSQL, [], function(err) {
                    if (err) {
                        console.error('[sqlite3] CREATE TABLE ERROR:', err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        }

        let columns = columnsRaw ? columnsRaw.split(',').map(c => c.trim()).filter(Boolean) : [];
        let values = [];
        if (valuesRaw) {
            if (valuesRaw.trim().startsWith('[') && valuesRaw.trim().endsWith(']')) {
                values = [valuesRaw.trim()];
                if (debugMode) console.log('[Local_Database] Detected full JSON array, saving as one string:', values[0]);
            } else if (valuesRaw.trim().startsWith('[{"freq":') && !valuesRaw.trim().endsWith('}]')) {
                let joined = valuesRaw.trim();
                if (!joined.endsWith('}]')) {
                    joined = joined + ']';
                }
                values = [joined];
            } else {
                values = valuesRaw.split(',').map(v => {
                    if (Array.isArray(v) || (typeof v === 'object' && v !== null)) {
                        return JSON.stringify(v);
                    }
                    try {
                        const parsed = JSON.parse(v);
                        if (typeof parsed === 'object') return v;
                    } catch {}
                    return v;
                });
            }
        }
        if (dboperation === 'update' && conditionColumn && !columns.includes(conditionColumn)) {
            columns.push(conditionColumn);
            values.push(conditionValue);
        }

        let effectiveOperation = dboperation;
        if (dboperation === 'update') {
            const noCondition = (!conditionColumn || conditionColumn.trim() === '') && (!conditionValue || conditionValue.trim() === '');
            if (noCondition) {
                effectiveOperation = 'save';
            }
        }

        let columnsToClear = [];
        if (dboperation === 'delete') {
            const columnsToClearRaw = this.evalMessage(data.deleteColumnsToClear, cache);
            if (columnsToClearRaw && columnsToClearRaw.trim() !== '') {
                columnsToClear = columnsToClearRaw.split(',').map(c => c.trim()).filter(Boolean);
            }
        }

        let allColumns = [...columns];
        if (conditionColumn && !allColumns.includes(conditionColumn)) allColumns.push(conditionColumn);
        if (columnsToClear && Array.isArray(columnsToClear)) {
            columnsToClear.forEach(col => {
                if (!allColumns.includes(col)) allColumns.push(col);
            });
        }
        if (allColumns.length === 0) allColumns = ['id'];
    const tableNameNoExt = tableName.replace('.sqlite','');
    const createCols = allColumns.map(col => `\`${col}\` TEXT`).join(', ');
    const createTableSQL = `CREATE TABLE IF NOT EXISTS "${tableNameNoExt}" (${createCols})`;
        try {
            await new Promise((resolve, reject) => {
                db.run(createTableSQL, [], function(err) {
                    if (err) {
                        console.error('[sqlite3] CREATE TABLE ERROR:', err);
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        } catch (err) {
            console.error('[sqlite3] DB CREATE TABLE Error:', err);
        }

        async function insertWithAutoColumns(sql, values, columns, table) {
            return await new Promise((resolve, reject) => {
                db.run(sql, values, async function(err) {
                    if (err && err.message && err.message.includes('no column named')) {
                        const match = err.message.match(/no column named ([^ ]+)/);
                        if (match) {
                            const missingCol = match[1];
                            const alterSQL = `ALTER TABLE ${table} ADD COLUMN ${missingCol} TEXT`;
                            db.run(alterSQL, alterErr => {
                                if (alterErr) {
                                    console.error('[sqlite3] ALTER TABLE ERROR:', alterErr);
                                    reject(alterErr);
                                } else {
                                    db.run(sql, values, function(retryErr) {
                                        if (retryErr) {
                                            console.error('[sqlite3] RETRY INSERT ERROR:', retryErr);
                                            reject(retryErr);
                                        } else {
                                            resolve({ lastID: this.lastID });
                                        }
                                    });
                                }
                            });
                        } else {
                            reject(err);
                        }
                    } else if (err) {
                        console.error('[sqlite3] STORE ERROR:', err);
                        reject(err);
                    } else {
                        resolve({ lastID: this.lastID });
                    }
                });
            });
        }

        async function updateWithAutoColumns(sql, values, columns, table) {
            return await new Promise((resolve, reject) => {
                db.run(sql, values, async function(err) {
                    if (err && err.message && err.message.includes('no such column')) {
                        const match = err.message.match(/no such column: ([^ ]+)/);
                        if (match) {
                            const missingCol = match[1];
                            const alterSQL = `ALTER TABLE ${table} ADD COLUMN ${missingCol} TEXT`;
                            db.run(alterSQL, alterErr => {
                                if (alterErr) {
                                    console.error('[sqlite3] ALTER TABLE ERROR:', alterErr);
                                    reject(alterErr);
                                } else {
                                    db.run(sql, values, function(retryErr) {
                                        if (retryErr) {
                                            console.error('[sqlite3] RETRY UPDATE ERROR:', retryErr);
                                            reject(retryErr);
                                        } else {
                                            resolve({ changes: this.changes });
                                        }
                                    });
                                }
                            });
                        } else {
                            reject(err);
                        }
                    } else if (err) {
                        console.error('[sqlite3] UPDATE ERROR:', err);
                        reject(err);
                    } else {
                        resolve({ changes: this.changes });
                    }
                });
            });
        }

        async function handleMissingTableOrColumn(err, sql, values, table, column) {
            if (err && err.message.includes('no such column')) {
                const match = err.message.match(/no such column: ([^ ]+)/);
                if (match) {
                    const missingCol = match[1];
                    const alterSQL = `ALTER TABLE "${table}" ADD COLUMN ${missingCol} TEXT DEFAULT '0'`;
                    await new Promise((resolve, reject) => {
                        db.run(alterSQL, (alterErr) => {
                            if (alterErr) {
                                console.error('[sqlite3] ALTER TABLE ERROR:', alterErr);
                                reject(alterErr);
                            } else {
                                console.log(`[sqlite3] Column '${missingCol}' added to table '${table}' with default value '0'.`);
                                resolve();
                            }
                        });
                    });
                    // Retry the original query after adding the column
                    return await new Promise((resolve, reject) => {
                        db.get(sql, values, (retryErr, row) => {
                            if (retryErr) {
                                console.error('[sqlite3] RETRY ERROR:', retryErr);
                                reject(retryErr);
                            } else {
                                resolve(row);
                            }
                        });
                    });
                }
            } else if (err && err.message.includes('no such table')) {
                const createTableSQL = `CREATE TABLE IF NOT EXISTS ${table} (${column} TEXT DEFAULT '0')`;
                await new Promise((resolve, reject) => {
                    db.run(createTableSQL, (createErr) => {
                        if (createErr) {
                            console.error('[sqlite3] CREATE TABLE ERROR:', createErr);
                            reject(createErr);
                        } else {
                            console.log(`[sqlite3] Table '${table}' created with column '${column}' and default value '0'.`);
                            resolve();
                        }
                    });
                });
                return await new Promise((resolve, reject) => {
                    db.get(sql, values, (retryErr, row) => {
                        if (retryErr) {
                            console.error('[sqlite3] RETRY ERROR:', retryErr);
                            reject(retryErr);
                        } else {
                            resolve(row);
                        }
                    });
                });
            }
            throw err;
        }

        try {
            if (dboperation === 'store') {
                const getColumnRaw = this.evalMessage(data.getColumn, cache);
                const getColumn = getColumnRaw && getColumnRaw.trim() !== '' ? getColumnRaw.trim() : null;
                if (getColumn && conditionColumn && values.length > 0) {
                    const columnToCheck = columns && columns.length > 0 ? columns[0] : null;
                    const valueToCheck = String(values[0]).trim();
                    const sql = `SELECT CAST(${quoteId(getColumn)} AS TEXT) AS ${quoteId(getColumn)} FROM "${tableName.replace('.sqlite','')}" WHERE ${quoteId(columnToCheck)} = ? COLLATE BINARY`;
                    output = await new Promise((resolve, reject) => {
                        db.get(sql, [valueToCheck], async (err, row) => {
                            if (err) {
                                try {
                                    const result = await handleMissingTableOrColumn(err, sql, [valueToCheck], tableName.replace('.sqlite', ''), getColumn);
                                    resolve(result ? String(result[getColumn]) : '0');
                                } catch (finalErr) {
                                    reject(finalErr);
                                }
                            } else {
                                resolve(row ? String(row[getColumn]) : '0');
                            }
                        });
                    });
                }
            }
        } catch (err) {
            console.error('[sqlite3] Final Error:', err);
        }

        try {
            if (dboperation === 'checkvar') {
                if (debugMode) console.log('[sqlite3] OPERATION: checkvar');
                    const conditionColumn = this.evalMessage(data.checkvarConditionColumn, cache);
                    const conditionValue = this.evalMessage(data.checkvarConditionValue, cache);
                    const getColumn = this.evalMessage(data.checkvarGetColumn, cache);
                    const compare = parseInt(data.checkvarComparison, 10);
                    let val2 = data.checkvarValue;
                    if (compare !== 6) val2 = this.evalIfPossible(val2, cache);
                    if (val2 === "true") val2 = true;
                    if (val2 === "false") val2 = false;
                    let result = false;
                    let val1;
                    if (debugMode) console.log('[sqlite3] CHECKVAR operation entered.', {
                        conditionColumn,
                        conditionValue,
                        getColumn,
                        compare,
                        val2: data.checkvarValue
                    });
                    if (conditionColumn && getColumn && conditionValue) {
                        const tableNoExt = tableName.replace('.sqlite','');
                        const pragmaSql = `PRAGMA table_info(\"${tableNoExt}\")`;
                        const columnsInfo = await new Promise((resolve, reject) => {
                            db.all(pragmaSql, [], (err, rows) => {
                                if (err) reject(err);
                                else resolve(rows);
                            });
                        });
                        const colNames = columnsInfo.map(col => col.name);
                        if (!colNames.includes(getColumn)) {
                            if (!colNames.map(c => c.toLowerCase()).includes(getColumn.toLowerCase())) {
                                const alterSQL = `ALTER TABLE \"${tableNoExt}\" ADD COLUMN \"${getColumn}\" TEXT`;
                                await new Promise((resolve, reject) => {
                                    db.run(alterSQL, [], err => err ? reject(err) : resolve());
                                });
                                if (debugMode) console.log(`[sqlite3] CHECKVAR: Dodano brakującą kolumnę ${getColumn}`);
                            } else {
                                if (debugMode) console.log(`[sqlite3] CHECKVAR: Kolumna ${getColumn} już istnieje (duplikat)`);
                            }
                        }
                        if (!colNames.includes(conditionColumn)) {
                            if (!colNames.map(c => c.toLowerCase()).includes(conditionColumn.toLowerCase())) {
                                const alterSQL = `ALTER TABLE \"${tableNoExt}\" ADD COLUMN \"${conditionColumn}\" TEXT`;
                                await new Promise((resolve, reject) => {
                                    db.run(alterSQL, [], err => err ? reject(err) : resolve());
                                });
                                if (debugMode) console.log(`[sqlite3] CHECKVAR: Dodano brakującą kolumnę ${conditionColumn}`);
                            } else {
                                if (debugMode) console.log(`[sqlite3] CHECKVAR: Kolumna ${conditionColumn} już istnieje (duplikat)`);
                            }
                        }
                        const sql = `SELECT CAST(${quoteId(getColumn)} AS TEXT) AS ${quoteId(getColumn)} FROM "${tableNoExt}" WHERE ${quoteId(conditionColumn)}=?`;
                        if (debugMode) console.log('[sqlite3] CHECKVAR SQL:', sql, [conditionValue]);
                        const row = await new Promise((resolve, reject) => {
                            db.get(sql, [String(conditionValue)], (err, row) => {
                                if (err) reject(err);
                                else resolve(row);
                            });
                        });
                        val1 = row ? String(row[getColumn]) : undefined;
                    } else {
                        val1 = undefined;
                    }
                    if ((val2 === undefined || val2 === null || val2 === '') && data.storage) {
                        const missingMsg = `[sqlite3] CHECKVAR: Brak danych w val2`;
                        if (debugMode) console.log(missingMsg, { val1, val2 });
                        this.storeValue(missingMsg, parseInt(data.storage, 10), this.evalMessage(data.varName, cache), cache);
                    }
                    switch (compare) {
                        case 0: // exists
                            result = val1 !== undefined && val1 !== null;
                            break;

                        case 1: // ==
                            if (typeof val1 === "string" && val1.includes(",")) {
                                val1 = val1.split(",").map(s => s.trim());
                            }
                            result = Array.isArray(val1) ? val1.includes(String(val2)) : val1 == val2;
                            break;

                        case 2: // ===
                            if (typeof val1 === "string" && val1.includes(",")) {
                                val1 = val1.split(",").map(s => s.trim());
                            }
                            result = Array.isArray(val1) ? val1.includes(String(val2)) : val1 === val2;
                            break;

                        case 3: // <
                            if (typeof val1 === "string" && val1.includes(",")) {
                                val1 = val1.split(",").map(s => s.trim());
                            }
                            result = Array.isArray(val1) ? val1.some(v => Number(v) < Number(val2)) : val1 < val2;
                            break;

                        case 4: // >
                            if (typeof val1 === "string" && val1.includes(",")) {
                                val1 = val1.split(",").map(s => s.trim());
                            }
                            result = Array.isArray(val1) ? val1.some(v => Number(v) > Number(val2)) : val1 > val2;
                            break;

                        case 5: // includes
                            if (typeof val1 === "string" && val1.includes(",")) {
                                val1 = val1.split(",").map(s => s.trim());
                            }
                            if (Array.isArray(val1)) {
                                result = val1.includes(String(val2));
                            } else if (typeof val1?.includes === "function") {
                                result = val1.includes(val2);
                            }
                            break;

                        case 6: // regex match
                            if (typeof val1 === "string" && val1.includes(",")) {
                                val1 = val1.split(",").map(s => s.trim());
                            }
                            if (Array.isArray(val1)) {
                                result = val1.some(v => String(v).match(new RegExp("^" + val2 + "$", "i")));
                            } else if (typeof val1?.match === "function") {
                                result = Boolean(val1.match(new RegExp("^" + val2 + "$", "i")));
                            }
                            break;

                        case 7: // startsWith
                            if (typeof val1 === "string" && val1.includes(",")) {
                                val1 = val1.split(",").map(s => s.trim());
                            }
                            if (Array.isArray(val1)) {
                                result = val1.some(v => String(v).startsWith(val2));
                            } else if (typeof val1?.startsWith === "function") {
                                result = Boolean(val1.startsWith(val2));
                            }
                            break;

                        case 8: // endsWith
                            if (typeof val1 === "string" && val1.includes(",")) {
                                val1 = val1.split(",").map(s => s.trim());
                            }
                            if (Array.isArray(val1)) {
                                result = val1.some(v => String(v).endsWith(val2));
                            } else if (typeof val1?.endsWith === "function") {
                                result = Boolean(val1.endsWith(val2));
                            }
                            break;

                        case 9: // length ===
                            if (typeof val1 === "string" && val1.includes(",")) {
                                val1 = val1.split(",").map(s => s.trim());
                            }
                            if (Array.isArray(val1)) {
                                result = val1.length === Number(val2);
                            } else if (typeof val1?.length === "number") {
                                result = val1.length === val2;
                            }
                            break;

                        case 10: // length >
                            if (typeof val1 === "string" && val1.includes(",")) {
                                val1 = val1.split(",").map(s => s.trim());
                            }
                            if (Array.isArray(val1)) {
                                result = val1.length > Number(val2);
                            } else if (typeof val1?.length === "number") {
                                result = val1.length > val2;
                            }
                            break;
                        case 11: // length <
                            if (typeof val1 === "string" && val1.includes(",")) {
                                val1 = val1.split(",").map(s => s.trim());
                            }
                            if (Array.isArray(val1)) {
                                result = val1.length < Number(val2);
                            } else if (typeof val1?.length === "number") {
                                result = val1.length < val2;
                            }
                            break;
                        case 12: // not equals
                            if (typeof val1 === "string" && val1.includes(",")) {
                                val1 = val1.split(",").map(s => s.trim());
                            }
                            if (Array.isArray(val1)) {
                                result = !val1.includes(String(val2));
                            } else {
                                result = val1 != val2;
                            }
                            break;
                    }
                    if (debugMode) {
                        const branch = result ? 'TRUE branch' : 'FALSE branch';
                        console.log(`[sqlite3][DEBUG] CHECKVAR result: ${result} → odsyła na ${branch}`);
                    }
                    this.executeResults(result, data?.branch ?? data, cache);
            return;
            } else if (dboperation === 'count') {
                if (debugMode) console.log('[sqlite3] OPERATION: count');
                    if (debugMode) console.log('[sqlite3] COUNT operation entered. countColumn:', countColumn);
                    if (countColumn && countColumn.trim() !== '') {
                        const sql = `SELECT COUNT(*) as cnt FROM "${tableName.replace('.sqlite','')}" WHERE ${quoteId(countColumn)} IS NOT NULL AND ${quoteId(countColumn)} != ''`;
                        if (debugMode) console.log('[sqlite3] COUNT SQL:', sql);
                        output = await new Promise((resolve, reject) => {
                            db.get(sql, [], (err, row) => {
                                if (err) {
                                    console.error('[sqlite3] COUNT ERROR:', err);
                                    reject(err);
                                } else {
                                    if (debugMode) console.log('[sqlite3] COUNT row:', row);
                                    resolve(row ? row.cnt : 0);
                                }
                            });
                        });
                        if (debugMode) console.log('[sqlite3] COUNT output:', output);
                    } else {
                        output = '[sqlite3] COUNT: No column specified.';
                        if (debugMode) console.log('[sqlite3] COUNT output:', output);
                    }
            // end count
            } else if (dboperation === 'countList') {
                if (debugMode) console.log('[sqlite3] OPERATION: countList');
                const countListMatchColumn = this.evalMessage(data.countListMatchColumn, cache);
                const countListCheckValue = this.evalMessage(data.countListCheckValue, cache);
                const countListColumn = this.evalMessage(data.countListColumn, cache);
                if (debugMode) console.log('[sqlite3] countList fields:', { countListMatchColumn, countListCheckValue, countListColumn });
                if (countListMatchColumn && countListCheckValue && countListColumn) {
                    const sql = `SELECT ${quoteId(countListColumn)} FROM "${tableName.replace('.sqlite','')}" WHERE ${quoteId(countListMatchColumn)} = ?`;
                    if (debugMode) console.log('[sqlite3] countList SQL:', sql);
                    const row = await new Promise((resolve, reject) => {
                        db.get(sql, [countListCheckValue], (err, row) => {
                            if (err) {
                                console.error('[sqlite3] countList ERROR:', err);
                                reject(err);
                            } else {
                                resolve(row);
                            }
                        });
                    });
                    let value = row && row[countListColumn] ? String(row[countListColumn]) : '';
                    if (debugMode) console.log('[sqlite3] countList value:', value);
                    let count = 0;
                    if (value.trim() !== '') {
                        count = value.split(',').map(s => s.trim()).filter(Boolean).length;
                    }
                    output = count;
                    if (debugMode) console.log('[sqlite3] countList output:', output);
                } else {
                    output = '[sqlite3] countList: Missing fields.';
                    if (debugMode) console.log('[sqlite3] countList output:', output);
                }
            // end countlist
            } else if (dboperation === 'leaderboard') {
                if (debugMode) console.log('[sqlite3] OPERATION: leaderboard');
                const leaderColStore = this.evalMessage(data.leaderColStore, cache);
                const leaderValueStore = this.evalMessage(data.leaderValueStore, cache);
                const leaderColGet = this.evalMessage(data.leaderColGet, cache);
                const leaderColMatch = this.evalMessage(data.leaderColMatch, cache);
                const leaderShowNumbers = (typeof data.leaderShowNumbers === 'string') ? data.leaderShowNumbers === 'true' : !!data.leaderShowNumbers;
                const leaderCharAfter = this.evalMessage(data.leaderCharAfter, cache) || '.';
                const leaderStartText = this.evalMessage(data.leaderStartText, cache) || '';
                const leaderMiddleText = this.evalMessage(data.leaderMiddleText, cache) || ' - ';
                const leaderEndText = this.evalMessage(data.leaderEndText, cache) || '';
                const leaderSortType = (this.evalMessage(data.leaderSortType, cache) || 'desc').toLowerCase() === 'asc' ? 'ASC' : 'DESC';
                let leaderResultLimit = parseInt(this.evalMessage(data.leaderResultLimit, cache), 10);
                if (isNaN(leaderResultLimit) || leaderResultLimit <= 0) leaderResultLimit = 10;

                if (!leaderColGet || !leaderColStore) {
                    output = '[sqlite3] leaderboard: Missing required fields (Column to get / Column to store).';
                    if (debugMode) console.log('[sqlite3] leaderboard output:', output);
                } else {
                    try {
                        const tableNoExt = tableName.replace('.sqlite','');
                        let sql = `SELECT ${quoteId(leaderColGet)} AS _g, ${quoteId(leaderColStore)} AS _s FROM "${tableNoExt}"`;
                        const params = [];
                        if (leaderColMatch && leaderValueStore) {
                            sql += ` WHERE ${quoteId(leaderColMatch)} = ?`;
                            params.push(leaderValueStore);
                        }
                        sql += ` ORDER BY CAST(${quoteId(leaderColStore)} AS REAL) ${leaderSortType} LIMIT ${leaderResultLimit}`;
                        if (debugMode) console.log('[sqlite3] leaderboard SQL:', sql, params);

                        const rows = await new Promise((resolve, reject) => {
                            db.all(sql, params, (err, rows) => {
                                if (err) {
                                    console.error('[sqlite3] leaderboard ERROR:', err);
                                    reject(err);
                                } else {
                                    resolve(rows || []);
                                }
                            });
                        });

                        // Ensure numeric sort in JS as fallback
                        rows.sort((a, b) => {
                            const na = Number(a && a._s ? a._s : 0);
                            const nb = Number(b && b._s ? b._s : 0);
                            return leaderSortType === 'ASC' ? na - nb : nb - na;
                        });

                        const lines = [];
                        if (leaderStartText && leaderStartText.trim() !== '') lines.push(leaderStartText);
                        for (let i = 0; i < rows.length; i++) {
                            const r = rows[i];
                            const name = r ? (r._g !== undefined && r._g !== null ? String(r._g) : '') : '';
                            const score = r ? (r._s !== undefined && r._s !== null ? String(r._s) : '0') : '0';
                            const idx = i + 1;
                            const numPart = leaderShowNumbers ? `${idx}${leaderCharAfter} ` : '';
                            const middle = leaderMiddleText !== undefined ? leaderMiddleText : ' - ';
                            const line = `${numPart}${name}${middle}${score}${leaderEndText}`;
                            lines.push(line);
                        }
                        output = lines.join('\n');
                        if (debugMode) console.log('[sqlite3] leaderboard output lines:', lines.length);
                    } catch (err) {
                        console.error('[sqlite3] leaderboard failed:', err);
                        output = `[sqlite3] leaderboard Error: ${err && err.message ? err.message : String(err)}`;
                    }
                }
            } else if (dboperation === 'update') {
                if (debugMode) console.log('[sqlite3] OPERATION: update');
                if (debugMode) console.log('[sqlite3] UPDATE operation entered.', {
                    columns,
                    values,
                    conditionColumn,
                    conditionValue
                });

                let nextValue = null;
                if (conditionValue && typeof conditionValue === 'string' && conditionValue.trim() === '[next]') {
                    const sql = `SELECT MAX(CAST(${quoteId(conditionColumn)} AS INTEGER)) as maxval FROM "${tableName.replace('.sqlite','')}"`;
                    const row = await new Promise((resolve, reject) => {
                        db.get(sql, [], (err, row) => {
                            if (err) reject(err);
                            else resolve(row);
                        });
                    });
                    let maxval = row && row.maxval !== undefined && row.maxval !== null ? Number(row.maxval) : 0;
                    nextValue = String(maxval + 1);
                }
                const effectiveConditionValue = nextValue !== null ? nextValue : conditionValue;

                await ensureTableExists(db, tableName, [...columns, conditionColumn]);

                if (!conditionColumn || !effectiveConditionValue) {
                        if (columns.length > 0 && values.length > 0) {
                            const placeholders = columns.map(() => '?').join(', ');
                        const insertSql = `INSERT INTO "${tableName.replace('.sqlite','')}" (${columns.map(c => quoteId(c)).join(', ')}) VALUES (${placeholders})`;
                        output = await insertWithAutoColumns(insertSql, values, columns, tableName.replace('.sqlite',''));
                        output = String(output);
                    } else {
                        output = '[sqlite3] SAVE: Missing columns or values.';
                        if (debugMode) console.log(output);
                    }
                } else if (columns.length > 0 && values.length > 0) {
                    if (debugMode) console.log('[sqlite3] UPDATE: With condition', { columns, values, conditionColumn, effectiveConditionValue });
                    if (!/^[\w]+$/.test(conditionColumn)) {
                        output = '[sqlite3] UPDATE: Kolumna warunku musi być poprawną nazwą.';
                        if (debugMode) console.log(output);
                    }

                    async function ensureColumnExists(db, tableName, column) {
                        if (!column) return;
                        const tableNoExt = tableName.replace('.sqlite','');
                        const sql = `ALTER TABLE \`${tableNoExt}\` ADD COLUMN \`${column}\` TEXT DEFAULT '0'`;
                        return new Promise((resolve) => {
                            db.run(sql, [], () => resolve());
                        });
                    }

                    for (let i = 0; i < columns.length; i++) {
                        const col = columns[i];
                        await ensureColumnExists(db, tableName, col);
                        let val = values[i];

                        if (debugMode) console.log(`[sqlite3][DEBUG] Processing column "${col}" with value:`, val);

                        if (typeof val === 'string') {
                            val = val.trim();

                            if (val.startsWith('^+')) {
                                const toAppend = val.slice(2);
                                const sql = `SELECT CAST(${quoteId(col)} AS TEXT) AS ${quoteId(col)} FROM "${tableName.replace('.sqlite','')}" WHERE ${quoteId(conditionColumn)}=?`;
                                    const row = await new Promise((resolve, reject) => {
                                        db.get(sql, [String(effectiveConditionValue)], (err, row) => err ? reject(err) : resolve(row));
                                    });
                                    let current = row && row[col] != null ? String(row[col]) : '';
                                if (debugMode) console.log(`[sqlite3][DEBUG] Append mode for "${col}": current="${current}", toAppend="${toAppend}"`);
                                values[i] = current.length > 0 ? current + ', ' + toAppend : toAppend;
                                if (debugMode) console.log(`[sqlite3][DEBUG] New value for "${col}":`, values[i]);
                            } 

                            else if (val.startsWith('^-')) {
                                const toRemove = val.slice(2);
                                const sql = `SELECT CAST(${quoteId(col)} AS TEXT) AS ${quoteId(col)} FROM "${tableName.replace('.sqlite','')}" WHERE ${quoteId(conditionColumn)}=?`;
                                const row = await new Promise((resolve, reject) => {
                                    db.get(sql, [String(effectiveConditionValue)], (err, row) => err ? reject(err) : resolve(row));
                                });
                                let current = row && row[col] != null ? String(row[col]) : '';
                                if (current.length === 0) {
                                    if (debugMode) console.log(`[sqlite3][DEBUG] Remove mode for "${col}": nothing to remove`);
                                    values[i] = '';
                                } else {
                                    let items = current.split(',').map(s => s.trim());
                                    const originalLength = items.length;
                                    items = items.filter(v => v !== toRemove);
                                    values[i] = items.join(', ');
                                    if (debugMode) console.log(`[sqlite3][DEBUG] Remove mode for "${col}": removed="${toRemove}", before=${originalLength} items, after=${items.length} items, newValue="${values[i]}"`);
                                }
                            }

                            else if (/^[+-]\d+$/.test(val)) {
                                const sql = `SELECT CAST(${quoteId(col)} AS TEXT) AS ${quoteId(col)} FROM "${tableName.replace('.sqlite','')}" WHERE ${quoteId(conditionColumn)}=?`;
                                const row = await new Promise((resolve, reject) => {
                                    db.get(sql, [String(effectiveConditionValue)], (err, row) => err ? reject(err) : resolve(row));
                                });
                                let current = row && row[col] != null ? BigInt(String(row[col])) : 0n;
                                let diff = BigInt(val);
                                values[i] = (current + diff).toString();
                                if (debugMode) console.log(`[sqlite3][DEBUG] Arithmetic mode for "${col}": current=${current}, diff=${diff}, newValue=${values[i]}`);
                            }
                        }
                    }

                    const checkSql = `SELECT COUNT(*) as cnt FROM "${tableName.replace('.sqlite','')}" WHERE ${quoteId(conditionColumn)}=?`;
                    const checkExists = await new Promise((resolve, reject) => {
                        db.get(checkSql, [effectiveConditionValue], (err, row) => {
                            if (err) {
                                output = String(output);
                                console.error('[sqlite3] CHECK EXISTS ERROR:', err);
                                reject(err);
                            } else {
                                resolve(row && row.cnt > 0);
                            }
                        });
                    });

                    if (!checkExists) {
                        let insertColumns = [...columns];
                        let insertValues = [...values];
                        if (!insertColumns.includes(conditionColumn)) {
                            insertColumns.push(conditionColumn);
                            insertValues.push(effectiveConditionValue);
                        } else {
                            output = String(output);
                            const idx = insertColumns.indexOf(conditionColumn);
                            insertValues[idx] = effectiveConditionValue;
                        }
                        if (debugMode) console.log('[sqlite3] UPDATE: No record exists, will insert.', { insertColumns, insertValues });
                        const placeholders = insertColumns.map(() => '?').join(', ');
                        const insertSql = `INSERT INTO "${tableName.replace('.sqlite','')}" (${insertColumns.map(c => quoteId(c)).join(', ')}) VALUES (${placeholders})`;
                        output = await insertWithAutoColumns(insertSql, insertValues, insertColumns, tableName.replace('.sqlite',''));
                    } else {
                        const nonConditionCols = columns.filter(col => col !== conditionColumn);
                        const setClause = nonConditionCols.map((col) => `${quoteId(col)}=?`).join(', ');
                        const updateValues = nonConditionCols.map((col) => values[columns.indexOf(col)]);
                        updateValues.push(effectiveConditionValue);

                        if (nonConditionCols.length === 0) {
                            if (debugMode) console.log('[sqlite3] UPDATE: No columns to update (only conditionColumn present)');
                            output = '[sqlite3] UPDATE: No columns to update.';
                        } else {
                            if (debugMode) console.log('[sqlite3] UPDATE: Record exists, will update.', { setClause, updateValues });
                            output = String(output);
                            const sql = `UPDATE "${tableName.replace('.sqlite','')}" SET ${setClause} WHERE ${quoteId(conditionColumn)}=?`;
                            output = await updateWithAutoColumns(sql, updateValues, nonConditionCols, tableName.replace('.sqlite',''));
                        }
                    }
                } else {
                    if (debugMode) console.log('[sqlite3] UPDATE: Missing columns or values.');
                    output = '[sqlite3] UPDATE: Missing columns or values.';
                    if (debugMode) console.log(output);
                }
            // end update
            } else if (dboperation === 'store') {
                const columnToCheck = columns && columns.length > 0 ? columns[0] : null;
                if (debugMode) console.log('[sqlite3] OPERATION: store');
                    if (debugMode) console.log('[sqlite3] STORE operation entered.', {
                        getColumn: data.getColumn,
                        columnToCheck,
                        values
                    });
                    const getColumnRaw = this.evalMessage(data.getColumn, cache);
                    const getColumn = getColumnRaw && getColumnRaw.trim() !== '' ? getColumnRaw.trim() : null;

                    if (values.length > 0 && values[0] === '[all]') {
                        if (debugMode) console.log('[sqlite3] STORE: Fetching all users as JSON table');
                        const sql = `SELECT * FROM "${tableName.replace('.sqlite', '')}"`;
                        output = await new Promise((resolve, reject) => {
                            db.all(sql, [], (err, rows) => {
                                if (err) {
                                    console.error('[sqlite3] STORE GET ALL USERS ERROR:', err);
                                    reject(err);
                                } else {
                                    const jsonTable = {};
                                    rows.forEach((row, index) => {
                                        Object.keys(row).forEach((key) => {
                                            if (!jsonTable[key]) jsonTable[key] = {};
                                            jsonTable[key][index + 1] = row[key];
                                        });
                                    });
                                    const jsonString = JSON.stringify(jsonTable, null, 2);
                                    resolve(jsonString);
                                }
                            });
                        });
                    } else if (getColumn && conditionColumn && values.length > 0) {

                        const columnToCheck = columns && columns.length > 0 ? columns[0] : null;
                        const valueToCheck = String(values[0]).trim();
                        const sql = `SELECT CAST(${quoteId(getColumn)} AS TEXT) AS ${quoteId(getColumn)} FROM "${tableName.replace('.sqlite','')}" WHERE ${quoteId(columnToCheck)}=?`;
                        output = await new Promise((resolve, reject) => {
                            db.get(sql, [valueToCheck], async (err, row) => {
                                if (err) {
                                    try {
                                        const result = await handleMissingTableOrColumn(err, sql, [valueToCheck], tableName.replace('.sqlite', ''), getColumn);
                                        resolve(result ? String(result[getColumn]) : '0');
                                    } catch (finalErr) {
                                        reject(finalErr);
                                    }
                                } else {
                                    resolve(row ? String(row[getColumn]) : '0');
                                }
                            });
                        });
                    } else if (getColumn && (!conditionColumn || values.length === 0)) {
                        if (debugMode) console.log('[sqlite3] STORE: getColumn only', { getColumn, value: values[0] });

                        const columnToCheck = columns && columns.length > 0 ? columns[0] : null;

                        if (!columnToCheck) {
                            if (debugMode) console.log('[DEBUG] No columnToStore provided in columns array, returning Brak danych');
                            output = 'Brak danych';
                        } else if (!values || values.length === 0 || values[0].trim() === '') {
                            if (debugMode) console.log('[DEBUG] No value provided in values array, returning Brak danych');
                            output = 'Brak danych';
                        } else {
                            const valueToCheck = String(values[0]).trim();
                            const sql = `SELECT CAST(${quoteId(getColumn)} AS TEXT) AS ${quoteId(getColumn)} FROM "${tableName.replace('.sqlite','')}" WHERE ${quoteId(columnToCheck)} = ? COLLATE BINARY`;

                            if (debugMode) console.log(`[DEBUG] SQL: ${sql}, value: "${valueToCheck}"`);

                            output = await new Promise((resolve) => {
                                db.get(sql, [valueToCheck], (err, row) => {
                                    if (err) {
                                        console.error('[sqlite3] STORE GET ERROR:', err);
                                        resolve('Brak danych');
                                    } else if (!row) {
                                        if (debugMode) console.log(`[DEBUG] No row found in column "${columnToCheck}" for value "${valueToCheck}"`);
                                        resolve('Brak danych');
                                    } else {
                                        if (debugMode) console.log(`[DEBUG] Row found:`, row);
                                        resolve(row[getColumn] !== undefined ? String(row[getColumn]) : 'Brak danych');
                                    }
                                });
                            });
                        }
                    } else if (!getColumn && conditionColumn && values.length > 0) {
                        if (debugMode) console.log('[sqlite3] STORE: conditionColumn only', { conditionColumn, value: values[0] });
                        const valueToCheck = String(values[0]).trim();
                        const sql = `SELECT * FROM "${tableName.replace('.sqlite','')}" WHERE ${quoteId(conditionColumn)}=? COLLATE BINARY`;
                        output = await new Promise((resolve, reject) => {
                            db.get(sql, [valueToCheck], (err, row) => {
                                if (err) {
                                    console.error('[sqlite3] STORE GET RECORD ERROR:', err);
                                    reject(err);
                                } else {
                                    resolve(row || 'Brak danych');
                                }
                            });
                        });
                    } else {
                        if (debugMode) console.log('[sqlite3] STORE: get all records');
                        const sql = `SELECT * FROM "${tableName.replace('.sqlite','')}"`;
                        if (debugMode) console.log('[sqlite3] STORE GET ALL RECORDS SQL:', sql);
                        output = await new Promise((resolve, reject) => {
                            db.all(sql, [], (err, rows) => {
                                if (err) {
                                    console.error('[sqlite3] STORE GET ALL RECORDS ERROR:', err);
                                    reject(err);
                                } else {
                                    resolve(rows);
                                }
                            });
                        });
                    }
            // end store
            } else if (dboperation === 'delete') {
                if (debugMode) console.log('[sqlite3] OPERATION: delete');
                    if (debugMode) console.log('[sqlite3] DELETE operation entered.', {
                        columns,
                        values,
                        columnsToClear
                    });
                    if (columnsToClear.length > 0 && columns.length === 0) {
                        if (debugMode) console.log('[sqlite3] DELETE: Clear all columns', { columnsToClear });
                        const setClause = columnsToClear.map(col => `${quoteId(col)}=NULL`).join(', ');
                        const sql = `UPDATE "${tableName.replace('.sqlite','')}" SET ${setClause}`;
                        output = await new Promise((resolve, reject) => {
                            db.run(sql, [], function(err) {
                                if (err) {
                                    console.error('[sqlite3] CLEAR ALL ERROR:', err);
                                    reject(err);
                                } else {
                                    resolve({ changes: this.changes });
                                }
                            });
                        });
                    } else if (columns.length > 0 && values.length > 0) {
                        if (debugMode) console.log('[sqlite3] DELETE: With where', { columns, values, columnsToClear });
                        const where = columns.map((col, i) => `${quoteId(col)}=?`).join(' AND ');
                        if (columnsToClear.length > 0) {
                            if (debugMode) console.log('[sqlite3] DELETE: Update set NULL with where', { setClause, where });
                            const setClause = columnsToClear.map(col => `${quoteId(col)}=NULL`).join(', ');
                            const sql = `UPDATE "${tableName.replace('.sqlite','')}" SET ${setClause} WHERE ${where}`;
                            output = await new Promise((resolve, reject) => {
                                db.run(sql, values, function(err) {
                                    if (err) {
                                        console.error('[sqlite3] CLEAR ERROR:', err);
                                        reject(err);
                                    } else {
                                        resolve({ changes: this.changes });
                                    }
                                });
                            });
                        } else {
                            if (debugMode) console.log('[sqlite3] DELETE: Delete with where', { where });
                            const sql = `DELETE FROM "${tableName.replace('.sqlite','')}" WHERE ${where}`;
                            output = await new Promise((resolve, reject) => {
                                db.run(sql, values, function(err) {
                                    if (err) {
                                        console.error('[sqlite3] DELETE ERROR:', err);
                                        reject(err);
                                    } else {
                                        resolve({ changes: this.changes });
                                    }
                                });
                            });
                        }
                    }
            // end delete
            } else if (dboperation === 'search') {
                if (debugMode) console.log('[sqlite3] OPERATION: search');
                const searchReturnColumn = this.evalMessage(data.searchReturnColumn, cache);
                const searchListColumn = this.evalMessage(data.searchListColumn, cache);
                const searchValue = this.evalMessage(data.searchValue, cache);
                if (debugMode) console.log('[sqlite3] search fields:', { searchReturnColumn, searchListColumn, searchValue });
                if (searchReturnColumn && searchListColumn && searchValue) {
                    const validCol = /^[a-zA-Z0-9_\-]+$/;
                    if (!validCol.test(searchReturnColumn) || !validCol.test(searchListColumn)) {
                        output = '[sqlite3] search: Invalid column name.';
                        if (debugMode) console.log('[sqlite3] search output:', output);
                    } else {
                        const sql = `SELECT ${quoteId(searchReturnColumn)}, ${quoteId(searchListColumn)} FROM "${tableName.replace('.sqlite','')}"`;
                        if (debugMode) console.log('[sqlite3] search SQL:', sql);
                        const rows = await new Promise((resolve, reject) => {
                            db.all(sql, [], (err, rows) => {
                                if (err) {
                                    console.error('[sqlite3] search ERROR:', err);
                                    reject(err);
                                } else {
                                    resolve(rows);
                                }
                            });
                        });
                        let found = null;
                        for (const row of rows) {
                            let list = row[searchListColumn];
                            if (typeof list === 'string') {
                                const arr = list.split(',').map(s => s.trim());
                                if (arr.includes(String(searchValue))) {
                                    found = row[searchReturnColumn];
                                    break;
                                }
                            } else if (Array.isArray(list)) {
                                if (list.includes(String(searchValue))) {
                                    found = row[searchReturnColumn];
                                    break;
                                }
                            }
                        }
                        output = found !== null && found !== undefined ? found : 'Brak danych';
                        if (debugMode) console.log('[sqlite3] search output:', output);
                    }
                } else {
                    output = '[sqlite3] search: Missing fields.';
                    if (debugMode) console.log('[sqlite3] search output:', output);
                }
            } else {
                if (debugMode) console.log('[sqlite3] OPERATION: unknown or not matched:', dboperation);
            }
        } catch (err) {
            console.error('[sqlite3] DB Error:', err);
            output = `[sqlite3] Error: ${err.message}`;
        } finally {
            db.close();
        }

        const varName = this.evalMessage(data.varName, cache);
        const storage = parseInt(data.storage, 10);
        this.storeValue(output, storage, varName, cache);
        this.callNextAction(cache);
    }
};