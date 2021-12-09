const toCurrency = price => new Intl.NumberFormat('ua-UA', {
		currency: 'UAH',
		style: 'currency'
	}).format(price)

document.querySelectorAll('.price').forEach(node => {
	node.textContent = toCurrency(node.textContent);
})


const $card = document.querySelector('#card');
if ($card) {
	$card.addEventListener('click', (e) => {
	if (e.target.classList.contains('js-remove')) {
		const id = e.target.dataset.id;

		fetch('/card/remove/' + id, {
			method: 'delete'
		})
		.then(res => res.json())
		.then(card => {
			if(card.courses.length) {
				const html = card.courses.map(el => {
					return `<tr>
								<td>${el.title}</td>
								<td>${el.count}</td>
								<td>
									<button class="btn btn small js-remove" data-id="${el.id}">Remove</button>
								</td>
							</tr>`
				}).join('')

				$card.querySelector('tbody').innerHTML = html;
				$card.querySelector('.price').textContent = toCurrency(card.price)

			}

			else {
				$card.innerHTML = `<p>Cart is empty</p>`
			}
		})
	}
})
}