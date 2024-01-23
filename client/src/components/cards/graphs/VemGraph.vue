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
	// Check which ones are really needed
	ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement);
	
	const plugin = {
		id: 'customCanvasBackgroundColor',
		beforeDraw: (chart) => {
			if (chart.config.options.chartArea && chart.config.options.chartArea.backgroundColor) {
				var ctx = chart.ctx;
				var chartArea = chart.chartArea;

				console.log(chart);

				ctx.save();
				ctx.fillStyle = chart.config.options.chartArea.backgroundColor;
				ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
				ctx.restore();
			}
		}
	};

	var defaultChartData = ref({});

	export default {
		name: 'VemGraph',
		components: { Bar },
		setup() {
			// Retrieve data

			defaultChartData.value = {
				labels: ["day 1", "day 2", "day 3", "day 4", "day 5", "day 6", "day 7"],
				datasets: [
					{
						label: "Average milk production",
						data: [50, 85, 57, 50, 60, null, 80],
						yAxisID: "A",
						borderColor: '#bdbdbd',
						backgroundColor: '#ffffff',
						order: 3,
						borderRadius: {topLeft: 15, topRight: 15},
						borderWidth: 1,
					},
					{
						type: 'line',
						label: "Average VEM needed",
						data: [350, 750, 450, null, 550, 730, 820],
						yAxisID: "B",
						borderColor: "#00ff00",
						backgroundColor: "#00bd00",
						order: 2,
						spanGaps: true
					},
					{
						type: 'line',
						label: "Average VEM provided",
						data: [400, 820, null, 550, 730, 750, 450],
						yAxisID: "B",
						borderColor: "#0000ff",
						backgroundColor: "#0000bd",
						order: 1,
						// spanGaps: true
					}
				]
			};
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
