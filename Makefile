dev:
	pip install -r back/requirements.txt
	cd front && yarn install --dev

migrate:
	python back/manage.py makemigrations
	python back/manage.py migrate

run:
	yarn --cwd front start & python back/manage.py runserver 0.0.0.0:5000
