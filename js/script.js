
        document.addEventListener('DOMContentLoaded', function() {
            
            const tooltipTitleCallback = (tooltipItems) => {
                const item = tooltipItems[0];
                let label = item.chart.data.labels[item.dataIndex];
                if (Array.isArray(label)) {
                    return label.join(' ');
                }
                return label;
            };

            const sharedTooltipConfig = {
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: tooltipTitleCallback
                        },
                        backgroundColor: '#000',
                        titleFont: { size: 14 },
                        bodyFont: { size: 12 },
                        padding: 10,
                        cornerRadius: 4
                    }
                }
            };
            
            const prevalenceCtx = document.getElementById('prevalenceChart').getContext('2d');
            new Chart(prevalenceCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Affected by Hemorrhoids', 'Not Affected'],
                    datasets: [{
                        data: [75, 25],
                        backgroundColor: ['#059669', '#f59e0b'],
                        borderColor: '#f9fafb',
                        borderWidth: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '60%',
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: '#374151',
                                font: { size: 14 }
                            }
                        },
                        tooltip: sharedTooltipConfig.plugins.tooltip
                    }
                }
            });

            const benefitsCtx = document.getElementById('benefitsChart').getContext('2d');
            new Chart(benefitsCtx, {
                type: 'radar',
                data: {
                    labels: ['Soothes Itching', 'Promotes Healing', 'Reduces Swelling', 'Calms Burning', 'Anti-Inflammatory', 'Natural Formula'],
                    datasets: [{
                        label: 'Dermossence Benefits',
                        data: [9, 9, 8, 9, 10, 10],
                        backgroundColor: 'rgba(4, 120, 87, 0.2)',
                        borderColor: '#047857',
                        pointBackgroundColor: '#047857',
                        pointBorderColor: '#fff',
                        pointHoverBackgroundColor: '#fff',
                        pointHoverBorderColor: '#047857',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 10,
                            angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
                            grid: { color: 'rgba(0, 0, 0, 0.1)' },
                            pointLabels: {
                                font: { size: 12, weight: 'bold' },
                                color: '#374151'
                            },
                            ticks: { display: false }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: sharedTooltipConfig.plugins.tooltip
                    }
                }
            });

            const tabsContainer = document.getElementById('tabs-container');
            const tabsContentContainer = document.getElementById('tabs-content-container');
            tabsContainer.addEventListener('click', function(e) {
                if (e.target.classList.contains('tab-button')) {
                    tabsContainer.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                    e.target.classList.add('active');
                    tabsContentContainer.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
                    document.getElementById(e.target.dataset.target).classList.remove('hidden');
                }
            });

            const faqData = [
                { q: 'Do hemorrhoids go away on their own?', a: 'Mild hemorrhoids often resolve within a few days with at-home care and lifestyle changes. Proactive management can speed up healing and prevent recurrence. More severe cases typically require treatment.' },
                { q: 'Is a natural oil like Dermossence messy to use?', a: 'The spray bottle design allows for controlled dispensing. Only a small amount is needed. When gently massaged into the skin, the oil absorbs well, leaving the skin feeling smooth, not greasy. Applying after a shower can enhance absorption.' },
                { q: 'How quickly can I expect relief with Dermossence?', a: 'The product claims an "immediate calming effect," likely due to the soothing, lubricating properties of the oil base. Deeper anti-inflammatory and healing benefits build with consistent use as directed (twice daily).' },
                { q: 'Can Dermossence be used for both internal and external hemorrhoids?', a: 'The instructions specify external application, making it ideal for relieving the symptoms of external hemorrhoids and the external discomfort of prolapsed hemorrhoids. Always follow the product label.' },
                { q: 'Do I still need to see a doctor?', a: 'Yes. Self-care is vital, but it is not a substitute for professional medical advice. It is essential to get a formal diagnosis to rule out other serious conditions and discuss the full range of treatment options.' }
            ];

            const accordionContainer = document.getElementById('accordion-container');
            faqData.forEach((item, index) => {
                const faqItem = document.createElement('div');
                faqItem.className = 'bg-white rounded-lg shadow-md';
                faqItem.innerHTML = `
                    <button class="accordion-button w-full text-left p-5 flex justify-between items-center font-semibold text-stone-700 hover:bg-stone-50">
                        <span>${item.q}</span>
                        <span class="transform transition-transform duration-300">▼</span>
                    </button>
                    <div class="accordion-content px-5 pb-5 text-stone-600">
                        <p>${item.a}</p>
                    </div>
                `;
                accordionContainer.appendChild(faqItem);
            });

            accordionContainer.addEventListener('click', function(e) {
                const button = e.target.closest('.accordion-button');
                if (button) {
                    const content = button.nextElementSibling;
                    const icon = button.querySelector('span:last-child');
                    
                    const isOpening = content.style.maxHeight === '0px' || !content.style.maxHeight;

                    // Close all others
                    accordionContainer.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = '0px');
                    accordionContainer.querySelectorAll('.accordion-button span:last-child').forEach(i => i.style.transform = 'rotate(0deg)');

                    if (isOpening) {
                        content.style.maxHeight = content.scrollHeight + 'px';
                        icon.style.transform = 'rotate(180deg)';
                    }
                }
            });
            
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        });