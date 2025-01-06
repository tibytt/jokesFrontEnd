
1. What's a closure? Where in the code is there a closure?

A closure is essentially the ability of a function to "remember" the variables from the scope in which it was created, even after that scope has finished executing.
This means the function has access to variables that were in scope when the function was created, even if it is called later.

an example on my code could be:
The functions i defined within the setup function in Vue's Composition API. For example the fetchJokes function to retrieve the jokes.

const fetchJokes = async () => {
  loading.value = true;
  if (selectedTypes.value.length > 0) {
    try {
      const type = selectedTypes.value.join(','); 
      jokes.value = await jokeService.getJokesByType(type, jokesCount.value);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  } else {
    try {
      jokes.value = await jokeService.getRandomJokes(jokesCount.value);
    } catch (error) {
      console.error('Error fetching jokes:', error);
    }
  }
  pageNumber.value = 1;
  loading.value = false;
};

This function has access to variables such as selectedTypes, jokesCount, loading, and pageNumber, which are defined in the setup function outside the function.
You might call fetchJokes on the initial load of the component and if the user interacts with the UI (for example, changes the selectedTypes), the fetchJokes function will still have access to the updated selectedTypes value. The ability to "remember" the state of selectedTypes of the setup function is the closure working.

2. Which are the potential side-effects in any function? Could you point out any of these cases in
your code? Are they expected? Can they be avoided?

Modifying the pageNumber: Changing the pageNumber state directly updates the pagination in the UI and can trigger a re-fetch of jokes depending on how you handle pagination.


    const filteredJokes = computed(() => {
      return jokes.value;
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredJokes.value.length / jokesPerPage);
    });

    const paginatedJokes = computed(() => {
      const startIndex = (pageNumber.value - 1) * jokesPerPage;
      return filteredJokes.value.slice(startIndex, startIndex + jokesPerPage);
    });

    const nextPage = () => {
      if (pageNumber.value < totalPages.value) {
        pageNumber.value++;
      }
    };

    const previousPage = () => {
      if (pageNumber.value > 1) {
        pageNumber.value--;
      }
    };


Are these expected?:
Yes, it’s expected that changing the page number updates the state and controls pagination. However, the actual data fetching based on page changes might result in additional network requests, which could be optimized.

Can they be avoided?:
Debounce or delay pagination requests: You can debounce the API calls so that multiple page changes don’t immediately trigger unnecessary API requests. Additionally, you could manage the state of the jokes on the backend so that jokes from the current page are not lost.

When you introduce filtering to your jokes list (by joke type or any other parameter), it has a side effect on the pagination. Specifically, after applying filters, the set of jokes that are available for display is reduced. This can affect how the pagination behaves because Filtered jokes reduce the total count and pagination needs to be adjusted.
We can fix this by handling the type and amount of elements on the request on the backend. Instead of fetching all jokes and then filtering them on the frontend, we can only ask for what is needed by sending the filtering and pagination parameters directly to the backend.



