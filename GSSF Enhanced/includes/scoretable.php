<div id="scoreTableDiv">
    <table id="scoreTable" class="table table-bordered text-center">
        <thead class="thead-dark">
            <tr class="text-center">
                <th scope="col"></th>
                <th scope="col">X's</th>
                <th scope="col">10's</th>
                <th scope="col">8's</th>
                <th scope="col">5's</th>
                <th scope="col">Misses</th>
                <th scope="col">Total Hits/Misses</th>
            </tr>
        </thead>
        <tbody>
            <tr id="targetOneRow">
                <td class="bg-secondary text-light">Target 1</td>
                <td><input id="t1x" class="form-control targetOne" type="text" placeholder="0"></td>
                <td><input id="t1ten" class="form-control targetOne" type="text" placeholder="0"></td>
                <td><input id="t1eight" class="form-control targetOne" type="text" placeholder="0"></td>
                <td><input id="t1five" class="form-control targetOne" type="text" placeholder="0"></td>
                <td id="t1Misses"></td>
                <td id="sumonetotalhitsmisses"></td>
            </tr>
            <tr id="targetTwoRow">
                <td class="bg-secondary text-light">Target 2</td>
                <td><input id="t2x" class="form-control targetTwo" type="text" placeholder="0"></td>
                <td><input id="t2ten" class="form-control targetTwo" type="text" placeholder="0"></td>
                <td><input id="t2eight" class="form-control targetTwo" type="text" placeholder="0"></td>
                <td><input id="t2five" class="form-control targetTwo" type="text" placeholder="0"></td>
                <td id="t2Misses"></td>
                <td id="sumtwototalhitsmisses"></td>
            </tr>
            <tr class="table-success">
                <!-- Row for sums -->
                <td class="bg-secondary text-light">Shots</td>
                <td id="sumx"></td>
                <td id="sumten"></td>
                <td id="sumeight"></td>
                <td id="sumfive"></td>
                <td id="summisses" class="bg-dark"></td>
                <td id="sumtotal" class="bg-dark"></td>
            </tr>

            <tr class="bg-secondary text-light">
                <td>Multiplier</td>
                <td>(x10)</td>
                <td>(x10)</td>
                <td>(x8)</td>
                <td>(x5)</td>
                <td class="goodWidth bg-danger text-light">Penalty</td>
                <td class="goodWidth bg-secondary text-light">Final Score</td>
            </tr>
            <tr class="table-success">
                <!-- Total of both targets -->
                <td class="bg-secondary text-light">Total</td>
                <td id="xScore"></td>
                <td id="xTen"></td>
                <td id="xEight"></td>
                <td id="xFive"></td>
                <td id="noPenalty" class="bg-danger targetOne"><input id="penaltyInput" class="form-control" type="text" placeholder="Enter Penalties"></td>
                <td id="finalScore"></td>
            </tr>
        </tbody>
    </table>
    <button id="previewScore" type="button" class="btn btn-primary" disabled>Preview Score</button>
</div>