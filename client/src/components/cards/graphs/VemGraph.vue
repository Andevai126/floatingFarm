<template>
	<div class="container rounded border bg-light shadow p-3 mt-5 mb-3">
		<h4>Energy Statistics</h4>
		<hr>

		<Bar
			id="my-chart-id"
			:options="chartOptions"
			:data="chartData"
			:plugins="chartPlugins"
		/>
	</div>
</template>
  
<script>
	import { ref } from 'vue'
	import { Bar } from 'vue-chartjs'
	import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement} from 'chart.js'
	import { getNutrientsOfMixes } from '../../../apiConfig'

	// Check which ones are really needed
	ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement);
	
	const plugin = {
		id: 'customCanvasBackgroundColor',
		beforeDraw: (chart) => {
			if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
				var ctx = chart.ctx;
				var chartArea = chart.chartArea;

				ctx.save();
				ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
				ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
				ctx.restore();
			}
		}
	};

	var defaultChartData = ref({
		labels: [],
		datasets: []
	});

	export default {
		name: 'VemGraph',
		components: { Bar },
		setup() {
			// Retrieve nutrients of mixes
			getNutrientsOfMixes().then((nutrientsOfMixes) => {
				// Find the earliest and latest dates
				const earliestDate = new Date(nutrientsOfMixes[0].dateTime).toISOString().slice(0, 10);
				const latestDate = new Date(nutrientsOfMixes[nutrientsOfMixes.length - 1].dateTime).toISOString().slice(0, 10);

				// Generate an array of all dates between the earliest and latest dates
				const allDates = [];
				for (let currentDate = new Date(earliestDate); currentDate <= new Date(latestDate); currentDate.setDate(currentDate.getDate() + 1)) {
					allDates.push(currentDate.toISOString().slice(0, 10));
				}

				// Generate an array with at the correct indices the available vem values
				var vemData = Array(allDates.length).fill(null);
				for (let i = 0; i < nutrientsOfMixes.length; i++) {
					var index = allDates.indexOf(new Date(nutrientsOfMixes[i].dateTime).toISOString().slice(0, 10));
					vemData[index] = nutrientsOfMixes[i].vemTotal;
				}

				defaultChartData.value = {
					labels: allDates,
					datasets: [
						{
							label: "Average milk production",
							data: [...Array(allDates.length).fill(22)],
							yAxisID: "A",
							borderColor: '#bdbdbd',
							backgroundColor: '#ffffff',
							order: 3,
							borderRadius: {topLeft: 5, topRight: 5},
							borderWidth: 1,
						},
						{
							type: 'line',
							label: "Average VEM needed",
							data: [...Array(allDates.length).fill(16567)],
							yAxisID: "B",
							borderColor: "#00ff00",
							backgroundColor: "#00bd00",
							order: 2,
							spanGaps: true
						},
						{
							type: 'line',
							label: "Average VEM provided",
							data: vemData,
							yAxisID: "B",
							borderColor: "#0000ff",
							backgroundColor: "#0000bd",
							order: 1,
							spanGaps: true
						}
					]
				};
			});
		},
		data() {
			return {
				chartData: defaultChartData,
				chartOptions: {
					responsive: true,
					plugins: {
						title: {
							display: true,
							text: 'Milk - VEM'
						},
						legend: {
							position: 'bottom',
						}
					},
					scales: {
						A: {
							type: 'linear',
							position: 'left',
						},
						B: {
							type: 'linear',
							position: 'right',
						},
						x: {
							grid: {
								display: false
							}
						}
					},
					chartArea: {
						backgroundColor: '#F0F5E4'
					}
				},
				chartPlugins: [plugin]
			}
		}
	}
</script>
