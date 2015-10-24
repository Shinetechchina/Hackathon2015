jQuery("#simulation")
  .on("pageload", ".s-b25617ac-3c30-419a-a041-d8c339a8b931 .pageload", function(event, data) {
    var jEvent, jFirer, cases;
    if(data === undefined) { data = event; }
    jEvent = jimEvent(event);
    jFirer = jEvent.getEventFirer();
    if(jFirer.is("#s-b25617ac-3c30-419a-a041-d8c339a8b931")) {
      cases = [
        {
          "blocks": [
            {
              "actions": [
                {
                  "action": "jimPause",
                  "parameter": {
                    "pause": 1000
                  }
                },
                {
                  "action": "jimNavigation",
                  "parameter": {
                    "target": "screens/68503a7d-e959-40d2-95b6-e671729aeb29",
                    "transition": "fade"
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