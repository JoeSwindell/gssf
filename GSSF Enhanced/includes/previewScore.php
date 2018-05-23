<div id="scoreTablePreviewDiv">
    <table id="scoreTablePreview" class="table table-bordered text-center">
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
            <tr id="targetOneRowPreview">
                <td class="bg-secondary text-light">Target 1</td>
                <td id="t1XPreview"></td>
                <td id="t1TenPreview"></td>
                <td id="t1EightPreview"></td>
                <td id="t1FivePreview"></td>
                <td id="t1MissesPreview"></td>
                <td id="t1TotalHitsMisses"></td>
            </tr>
            <tr id="targetTwoRowPreview">
                <td class="bg-secondary text-light">Target 2</td>
                <td id="t2XPreview"></td>
                <td id="t2TenPreview"></td>
                <td id="t2EightPreview"></td>
                <td id="t2FivePreview"></td>
                <td id="t2MissesPreview"></td>
                <td id="t2TotalHitsMisses"></td>
            </tr>
            <tr class="table-success">
                <!-- Row for sums -->
                <td class="bg-secondary text-light">Shots</tdclass="bg-secondary>
                <td id="totalXHitsPreview"></td>
                <td id="totalTenHitsPreview"></td>
                <td id="totalEightHitsPreview"></td>
                <td id="totalFiveHitsPreview"></td>
                <td class="bg-dark"></td>
                <td class="bg-dark"></td>
            </tr>

            <tr class="bg-secondary text-light"><!-- Headers-->
                <td>Multiplier</td>
                <td>(x10)</td>
                <td>(x10)</td>
                <td>(x8)</td>
                <td>(x5)</td>
                <td class="goodWidth bg-danger text-light">Penalty</td>
                <td class="goodWidth bg-secondary text-light">Final Score</td>
            </tr>
            <tr class="table-success text-primary">
                <!-- Total of both targets -->
                <td class="bg-secondary text-light">Total</td>
                <td id="totalXScorePreview"></td>
                <td id="totalTenScorePreview"></td>
                <td id="totalEightScorePreview"></td>
                <td id="totalFiveScorePreview"></td>
                <td id="totalPenaltiesPreview" class="bg-danger text-light"></td>
                <td id="previewFinalScore"></td>
            </tr>
        </tbody>
    </table>

    <canvas id="sketchpad" width="400" height="300"></canvas>
</div>