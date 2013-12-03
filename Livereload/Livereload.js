/*
* @author Ikenna Michael (http://github.com/ikmich/)
* @email michfx@gmail.com
*/

(function ()
{
	var RESULT_MODIFIED = '1';
	var REFRESH_INTERVAL = 400; // ms
	var INITIAL_DELAY = 1000; // ms

	/*
	* The ROOT_DIR variable MUST be defined with the value of the site root, in a script on the page that references Livereload.js, BEFORE the script that references Livereload.js.
	*/
	if (typeof ROOT_DIR == 'undefined')
	{
		var msg = "ROOT_DIR variable not defined.";
		alert(msg);
		throw new Error(msg);
	}

	function reload()
	{
		location.reload(true);
	}

	function livereload()
	{
		var $ = jQuery;
		$(document).ready(function ()
		{
			function reloadCheck()
			{
				$.get(ROOT_DIR + 'LiveReload/LiveReload.aspx', function (response)
				{
					if (RESULT_MODIFIED === response)
					{
						reload();
					}
					setTimeout(reloadCheck, REFRESH_INTERVAL);
				});
			}
			setTimeout(reloadCheck, INITIAL_DELAY);
		});
	}

	if (typeof jQuery == 'undefined')
	{
		// jQuery not available. Load it dynamically.
		var head = document.getElementsByTagName('head')[0];
		var scrJq = document.createElement('script');
		scrJq.src = ROOT_DIR + 'LiveReload/jquery-1.8.0.min.js';
		head.insertBefore(scrJq, head.getElementsByTagName('script')[0]);

		// Start livereload after the jQuery script has loaded.
		scrJq.addEventListener('load', function ()
		{
			livereload();
		});

		// If the dynamic jQuery loading failed.
		scrJq.addEventListener('error', function ()
		{
			var msg = "Livereload could not load jQuery";
			alert(msg);
			throw new Error(msg);
		});
	}
	else
	{
		livereload();
	}
})();