'use strict';

module.exports.inject = function () {

		angular.module('mockModule', ['protractorApp', 'ngMockE2E'])
			.run(function ($httpBackend) {

				var loginToken = {
					"token":"fb457ad0b3a64850b6a1927e50b3ad07",
					"username":"alex@endava.com",
					"creationDate":1431856901712
				};

				var mockedPosts = [
					{
						"title":"MIT Study suggests current solar power tech is good enough",
						"message":"The standard line about solar power is that while good in theory, the technology just isn't there to keep our lights on and our Netflix streaming. But a new study from MIT (PDF) suggests that's not the case. According to the massive report (an epic 356 pages) current crystalline silicon photovoltaic technology is capable of delivering terawatt-scale power by 2050. That would be many times larger than Topaz facility California that generates 550 megawatts. While there is certainly room for improvement in efficiency, the MIT study says that the biggest hurdle isn't tech, it's investment. The authors called out the lack of funding for research and development, but focused more on poor governmental policies. Subsidies generally go to other energy sources, like oil and natural gas, and trade policies set by the federal government have driven up prices by restricting imports of cheaper solar parts in order to boost domestic production.",
						"author":"MIT"
					},
					{
						"title":"NASA thinks a robotic eel might be the key to exploring Europa",
						"message":"We've seen the submarine that NASA wants to explore Saturn's moon Titan with, but compared to what the aeronautics outfit's looking at for icy climes like Jupiter's Europa it's downright pedestrian. The wormy-looking contraption up above is actually considered a type of amphibious rover and it's pretty different from the Deep-SCINI we've seen previously. Because there aren't exactly electrical outlets anywhere aside from Earth and relying on solar power might not always be feasible, it has to use alternative means for energy. In this case, NASA says antenna on the soft robot's back would draw energy from \"locally changing magnetic fields.\"",
						"author":"NASA"
					}
				];

				$httpBackend.whenGET(/http:\/\/.*\/login/).respond(function () {
					return [200, loginToken];
				});

				$httpBackend.whenGET(/http:\/\/.*\/posts/).respond(function () {
					return [200, mockedPosts, {Auth : 'fb457ad0b3a64850b6a1927e50b3ad07'}];
				});

				$httpBackend.whenGET(/.*/).passThrough();
			});
};
