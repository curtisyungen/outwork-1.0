correctMetrics = () => {
    workoutAPI.getAllWorkouts()
        .then((res) => {

            let lifts = [];

            for (var r in res.data) {
                if (res.data[r].workoutType === "lift") {
                    lifts.push(res.data[r]);
                }
            }

            // For each lift...
            for (var l = 0; l < lifts.length; l++) {
                let pushups = 0;
                let pullups = 0;
                let lift = JSON.parse(lifts[l].workout);

                // For each set...
                for (var set in lift) {
                    // For each exercise...
                    for (var ex in lift[set]) {

                        let name = lift[set][ex].name.toLowerCase();

                        if (name.indexOf("push-up") > -1 ||
                            name.indexOf("push up") > -1) {

                            let sets = parseFloat(lift[set][ex].sets) || 1;
                            let reps = parseFloat(lift[set][ex].reps) || 1;

                            if (!isNaN(reps)) {
                                pushups += sets * reps;
                            }
                        }

                        if (name.indexOf("pull-up") > -1 ||
                            name.indexOf("pull up") > -1 ||
                            name.indexOf("chin-up") > -1 ||
                            name.indexOf("chin up") > -1) {

                            if (name.indexOf("static") === -1 && name.indexOf("hold") === -1) {

                                let sets = parseFloat(lift[set][ex].sets) || 1;
                                let reps = parseFloat(lift[set][ex].reps) || 1;

                                if (!isNaN(reps)) {
                                    pullups += sets * reps;
                                }
                            }
                        }
                    }
                }

                this.setMetrics(lifts[l].id, pushups, pullups);
            }
        });
}

setMetrics = (id, pushups, pullups) => {
    workoutAPI.updateWorkout(id, pushups, pullups);
}