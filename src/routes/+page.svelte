<!-- src/routes/+page.svelte -->
<script lang="ts">
    import { calculateTax } from '$lib/calculateTax';

    let income = 60000;
    let result = calculateTax(income);
    let showInfo = true;
    let expandedTerm: string | null = null;
    let showNotes = false;
  
    $: {
        try {
            result = calculateTax(income);
        } catch (error) {
            console.error('Error calculating tax:', error);
        }
    }

    function getPercentage(amount: number): string {
        return ((amount / income) * 100).toFixed(1);
    }

    function formatMoney(amount: number): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    function toggleTerm(term: string) {
        expandedTerm = expandedTerm === term ? null : term;
    }

    function getHighestBracketRate(): number {
        for (let i = result.taxDetails.length - 1; i >= 0; i--) {
            if (result.taxDetails[i].incomeInBracket > 0) {
                return result.taxDetails[i].rate;
            }
        }
        return 0;
    }
</script>
  
<div class="max-w-4xl mx-auto px-4 py-4 sm:py-8">
    <header class="text-center mb-8 sm:mb-12">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">Understanding Marginal Tax Rates</h1>
        <p class="text-sm sm:text-base text-gray-600">See how your income is actually taxed across different brackets</p>
    </header>
    
    <!-- Educational Content -->
    <div class="mb-8 sm:mb-12 bg-blue-50 p-4 sm:p-6 rounded-xl border border-blue-100">
        <div class="space-y-4 text-gray-700">
            <p class="text-base sm:text-lg font-medium text-blue-900">
                <span class="font-bold">Common Myth:</span> "If I earn more money, I might end up with less take-home pay because I'll be in a higher tax bracket."
            </p>
            
            <div class="bg-white p-4 sm:p-5 rounded-lg border border-blue-200 shadow-sm">
                <h3 class="font-semibold text-base sm:text-lg mb-2 text-blue-900">The Truth:</h3>
                <p class="mb-3">This is a common misconception! In reality:</p>
                <ul class="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                    <li>Only the portion of your income that exceeds a bracket's threshold is taxed at the higher rate</li>
                    <li>You'll <span class="font-semibold">always</span> take home more money when you earn more</li>
                    <li>Moving to a higher tax bracket only affects the additional income, not your entire income</li>
                </ul>
            </div>

            <div class="bg-white p-4 sm:p-5 rounded-lg border border-blue-200 shadow-sm">
                <h3 class="font-semibold text-base sm:text-lg mb-2 text-blue-900">Example:</h3>
                <p class="mb-3">Let's say you're a single filer earning $47,150 (the top of the 12% bracket):</p>
                <ul class="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                    <li>If you earn $1 more, only that $1 is taxed at 22%</li>
                    <li>Your take-home pay would be $0.78 more, not less</li>
                    <li>All your previous income stays taxed at the same rates</li>
                </ul>
            </div>

            <p class="text-xs sm:text-sm text-gray-600 italic">
                Try the calculator below to see how your income is actually taxed. Notice how each additional dollar you earn 
                always increases your take-home pay, even when you enter a new tax bracket.
            </p>
        </div>
    </div>

    <!-- Tax Calculator -->
    <div class="mb-8 sm:mb-12 bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
        <!-- Income Input Section -->
        <div class="bg-gray-50 p-4 sm:p-5 rounded-lg mb-6">
            <label for="income" class="block text-sm font-medium text-gray-700 mb-2">Annual Income</label>
            <div class="flex items-center">
                <span class="text-gray-500 mr-2 text-lg">$</span>
                <input
                    id="income"
                    type="number"
                    bind:value={income}
                    min="0"
                    step="1000"
                    class="flex-1 px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div class="flex justify-between mt-3">
                <button 
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    on:click={() => income = Math.max(0, income - 1000)}
                >
                    -$1,000
                </button>
                <button 
                    class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    on:click={() => income += 1000}
                >
                    +$1,000
                </button>
            </div>
        </div>

        <!-- Summary Statistics -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div class="bg-gray-50 p-3 sm:p-4 rounded-lg relative group">
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        class="text-gray-400 hover:text-gray-600"
                        on:click={() => toggleTerm('totalTax')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div class="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
                    </svg>
                    <p class="text-xs sm:text-sm text-gray-600">Total Tax Owed</p>
                </div>
                <p class="text-xl sm:text-2xl font-bold text-gray-900">{formatMoney(result.totalTax)}</p>
                {#if expandedTerm === 'totalTax'}
                    <div class="absolute z-10 mt-2 p-2 bg-white border rounded-lg shadow-lg text-xs text-gray-600">
                        The total amount of federal income tax you owe based on your income and the marginal tax rates.
                    </div>
                {/if}
            </div>
            <div class="bg-gray-50 p-3 sm:p-4 rounded-lg relative group">
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        class="text-gray-400 hover:text-gray-600"
                        on:click={() => toggleTerm('takeHome')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div class="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                    </svg>
                    <p class="text-xs sm:text-sm text-gray-600">Take-Home Pay</p>
                </div>
                <p class="text-xl sm:text-2xl font-bold text-gray-900">{formatMoney(income - result.totalTax)}</p>
                {#if expandedTerm === 'takeHome'}
                    <div class="absolute z-10 mt-2 p-2 bg-white border rounded-lg shadow-lg text-xs text-gray-600">
                        Your income after federal income tax is deducted. This is what you actually receive.
                    </div>
                {/if}
            </div>
            <div class="bg-gray-50 p-3 sm:p-4 rounded-lg relative group">
                <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        class="text-gray-400 hover:text-gray-600"
                        on:click={() => toggleTerm('effectiveRate')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div class="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    <p class="text-xs sm:text-sm text-gray-600">Effective Tax Rate</p>
                </div>
                <p class="text-xl sm:text-2xl font-bold text-gray-900">{((result.totalTax / income) * 100).toFixed(2)}%</p>
                {#if expandedTerm === 'effectiveRate'}
                    <div class="absolute z-10 mt-2 p-2 bg-white border rounded-lg shadow-lg text-xs text-gray-600">
                        The average tax rate you pay on your total income. This is different from your marginal tax rate.
                    </div>
                {/if}
            </div>
        </div>

        <!-- Tax Breakdown Section -->
        <div class="border-t border-gray-200 pt-6">
            <h3 class="font-semibold text-base sm:text-lg text-gray-900 mb-4">Tax Breakdown</h3>
            <div class="overflow-x-auto -mx-4 sm:mx-0">
                <div class="min-w-full inline-block align-middle">
                    <table class="min-w-full">
                        <thead>
                            <tr class="bg-gray-50">
                                <th class="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700">Tax Rate</th>
                                <th class="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700">Tax Distribution</th>
                                <th class="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700">Income</th>
                                <th class="px-3 sm:px-4 py-2 text-left text-xs sm:text-sm font-medium text-gray-700">Tax</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            {#each result.taxDetails as detail, i}
                            <tr class={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td class="px-3 sm:px-4 py-2 font-semibold text-gray-900">{(detail.rate * 100).toFixed(0)}%</td>
                                <td class="px-3 sm:px-4 py-2">
                                    {#if detail.incomeInBracket > 0}
                                        <div class="relative group">
                                            <div class="w-full bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg h-3">
                                                <div 
                                                    class="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-lg transition-all duration-300" 
                                                    style="width: {(detail.incomeInBracket / income * 100).toFixed(1)}%"
                                                    title={`${getPercentage(detail.incomeInBracket)}% of your income is taxed at ${(detail.rate * 100).toFixed(0)}%`}
                                                ></div>
                                            </div>
                                            <div class="absolute right-0 -top-16 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white shadow-lg rounded-lg p-2 text-xs text-gray-700 whitespace-nowrap z-10">
                                                <div class="font-medium">{formatMoney(detail.incomeInBracket)}</div>
                                                <div class="text-gray-500">({getPercentage(detail.incomeInBracket)}% of total income)</div>
                                                <div class="text-gray-500">Taxed at {(detail.rate * 100).toFixed(0)}%</div>
                                            </div>
                                        </div>
                                    {/if}
                                </td>
                                <td class="px-3 sm:px-4 py-2 text-gray-700 text-sm">{formatMoney(detail.incomeInBracket)}</td>
                                <td class="px-3 sm:px-4 py-2 text-gray-700 text-sm">{formatMoney(detail.taxInBracket)}</td>
                            </tr>
                            {/each}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-2 text-xs text-gray-500 text-center sm:hidden">
                ← Scroll horizontally to see all columns →
            </div>
        </div>

        <!-- Key Insight -->
        <div class="bg-blue-50 p-4 sm:p-5 rounded-lg border border-blue-200 mt-6">
            <h3 class="font-semibold text-base sm:text-lg mb-2 text-blue-900">Key Insight:</h3>
            <p class="mb-3">Your highest tax bracket rate is NOT your effective tax rate:</p>
            <ul class="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-sm sm:text-base">
                <li>Your <span class="font-semibold">marginal tax rate</span> is the rate applied to your highest bracket ({(getHighestBracketRate() * 100).toFixed(0)}% in this case)</li>
                <li>Your <span class="font-semibold">effective tax rate</span> is the average rate you pay on all your income ({(result.totalTax / income * 100).toFixed(2)}% in this case)</li>
                <li>This difference exists because your lower income portions are taxed at lower rates (10%, 12%, etc.)</li>
            </ul>
            <p class="mt-3 text-sm text-gray-600">
                Notice how your effective tax rate is always lower than your highest bracket rate. This is the power of progressive taxation!
            </p>
        </div>
    </div>

    <!-- Important Notes -->
    <div class="bg-yellow-50 p-4 sm:p-6 rounded-xl border border-yellow-200">
        <div class="flex justify-between items-center mb-4">
            <h3 class="font-semibold text-base sm:text-lg text-yellow-900">Important Notes About This Tool</h3>
            <button 
                class="text-sm text-yellow-600 hover:text-yellow-800 flex items-center"
                on:click={() => showNotes = !showNotes}
            >
                {showNotes ? 'Hide Notes' : 'Show Notes'}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>

        {#if showNotes}
            <div class="space-y-4 text-yellow-800">
                <div class="bg-white p-3 sm:p-4 rounded-lg border border-yellow-200 shadow-sm">
                    <h4 class="font-medium mb-2 text-sm sm:text-base">What's Not Included:</h4>
                    <ul class="list-disc pl-4 sm:pl-5 space-y-1 text-xs sm:text-sm">
                        <li>Standard or itemized deductions</li>
                        <li>Tax credits (like the Child Tax Credit or Earned Income Tax Credit)</li>
                        <li>State and local taxes</li>
                        <li>Social Security and Medicare taxes</li>
                        <li>Capital gains taxes</li>
                        <li>Alternative Minimum Tax (AMT)</li>
                    </ul>
                </div>

                <div class="bg-white p-3 sm:p-4 rounded-lg border border-yellow-200 shadow-sm">
                    <h4 class="font-medium mb-2 text-sm sm:text-base">What This Tool Shows:</h4>
                    <ul class="list-disc pl-4 sm:pl-5 space-y-1 text-xs sm:text-sm">
                        <li>How marginal tax rates work in principle</li>
                        <li>The progressive nature of the federal income tax system</li>
                        <li>Why moving to a higher tax bracket doesn't reduce your take-home pay</li>
                    </ul>
                </div>

                <p class="text-xs sm:text-sm italic">
                    This calculator is for educational purposes only. For your actual tax situation, consult a tax professional 
                    or use a comprehensive tax calculator that includes all relevant factors.
                </p>
            </div>
        {/if}
    </div>

    <!-- Footer -->
    <footer class="mt-12 text-center text-sm text-gray-500">
        <div class="space-y-2">
            <p>Built by <a href="https://johncollier.me" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">John Collier</a></p>
            <div class="flex justify-center space-x-4">
                <a href="https://github.com/jpcollier" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-700">GitHub</a>
                <a href="https://www.linkedin.com/in/john-collier-6557115b/" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-700">LinkedIn</a>
                <a href="https://bsky.app/profile/katocollier.bsky.social" target="_blank" rel="noopener noreferrer" class="text-gray-500 hover:text-gray-700">Bluesky</a>
            </div>
            <p class="text-xs">© {new Date().getFullYear()} All rights reserved</p>
        </div>
    </footer>
</div>