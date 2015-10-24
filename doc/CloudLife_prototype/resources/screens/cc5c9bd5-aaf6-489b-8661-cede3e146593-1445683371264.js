jQuery("#simulation")
  .on("click", ".s-cc5c9bd5-aaf6-489b-8661-cede3e146593 .click", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Label_53")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/1482b44b-1b19-42c8-9ee7-4aafcc639c93"
                  }
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Label_54")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/f29b9c08-4dbb-41a1-9e02-7f1bd90aaec3"
                  }
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Label_55")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-cc5c9bd5-aaf6-489b-8661-cede3e146593 #s-Label_55": {
                      "attributes": {
                        "background-color": "#C4C2C5",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-cc5c9bd5-aaf6-489b-8661-cede3e146593 #s-Label_55": {
                      "attributes-ie": {
                        "-pie-background": "#C4C2C5",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                },
                {
                  "action": "jimPause",
                  "parameter": {
                    "pause": 100
                  }
                },
                {
                  "action": "jimChangeStyle",
                  "parameter": [ {
                    "#s-cc5c9bd5-aaf6-489b-8661-cede3e146593 #s-Label_55": {
                      "attributes": {
                        "background-color": "#FFFFFF",
                        "background-image": "none"
                      }
                    }
                  },{
                    "#s-cc5c9bd5-aaf6-489b-8661-cede3e146593 #s-Label_55": {
                      "attributes-ie": {
                        "-pie-background": "#FFFFFF",
                        "-pie-poll": "false"
                      }
                    }
                  } ]
                },
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/68503a7d-e959-40d2-95b6-e671729aeb29",
                    "transition": "slideleft"
                  }
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    } else if(jFirer.is("#s-Image_map_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/68503a7d-e959-40d2-95b6-e671729aeb29",
                    "transition": "slideleft"
                  }
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  })
  .on("pageload", ".s-cc5c9bd5-aaf6-489b-8661-cede3e146593 .pageload", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-Label_1")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimSetValue",
                  "parameter": {
                    "target": "#s-Label_1",
                    "value": {
                      "action": "jimConcat",
                      "parameter": [ {
                        "action": "jimSubstring",
                        "parameter": [ {
                          "action": "jimSystemTime"
                        },"0","5" ]
                      }," PM" ]
                    }
                  }
                }
              ]
            }
          ]
        }
      ];
      event.data = data;
      jEvent.launchCases(cases);
    }
  });