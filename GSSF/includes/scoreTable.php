<table id="scoreTable" class="table table-bordered">
    <thead class="thead-dark">
        <tr>
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
        <tr>
            <td>Target 1</td>
            <td><input id="t1x" class="form-control targetOne" type="text" placeholder="Enter Score"></td>
            <td><input id="t1ten" class="form-control targetOne" type="text" placeholder="Enter Score"></td>
            <td><input id="t1eight" class="form-control targetOne" type="text" placeholder="Enter Score"></td>
            <td><input id="t1five" class="form-control targetOne" type="text" placeholder="Enter Score"></td>
            <td></td>
            <td id="sumonetotalhitsmisses"></td>            
        </tr>
        <tr>
            <td>Target 2</td>
            <td><input id="t2x" class="form-control targetTwo" type="text" placeholder="Enter Score"></td>
            <td><input id="t2ten" class="form-control targetTwo" type="text" placeholder="Enter Score"></td>
            <td><input id="t2eight" class="form-control targetTwo" type="text" placeholder="Enter Score"></td>
            <td><input id="t2five" class="form-control targetTwo" type="text" placeholder="Enter Score"></td>
            <td></td>
            <td id="sumtwototalhitsmisses"></td>
        </tr>
        <tr> <!-- Row for sums -->
            <td>Sum</td>
            <td id="sumx"></td>
            <td id="sumten"></td>
            <td id="sumeight"></td>
            <td id="sumfive"></td>
            <td id="summisses"></td>
            <td id="sumtotal"></td>
        </tr>

        <tr class="table-success">
            <td></td>
            <td>(x10)</td>
            <td>(x10)</td>
            <td>(x8)</td>
            <td>(x5)</td>
            <td class="goodWidth">No Penalty</td>
            <td class="goodWidth">Final Score</td>            
        </tr>
        <tr> <!-- Total of both targets -->
            <td>Total</td>
            <td id="xScore"></td>
            <td id="xTen"></td>
            <td id="xEight"></td>
            <td id="xFive"></td>
            <td id="noPenalty"></td>
            <td id="finalScore"></td>
        </tr>
    </tbody>
</table>

