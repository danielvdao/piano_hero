#!/usr/bin/python

import urllib2


def main():
	f = open('get.txt', 'rw+')
	print 'Reading file:', f.name

	file_name = f.readline().strip()
	file_ogg = f.readline().strip()
	file_mp3 = f.readline().strip()

	while file_name and file_ogg and file_ogg:
		print '\nFile:', file_name

		print 'Downloading: ogg'
		dl_ogg = urllib2.urlopen(file_ogg)
		output_ogg = open(file_name+'.ogg', 'wb')
		output_ogg.write(dl_ogg.read())
		output_ogg.close()

		print 'Downloading: mp3'
		dl_mp3 = urllib2.urlopen(file_mp3)
		output_mp3 = open(file_name+'.mp3', 'wb')
		output_mp3.write(dl_mp3.read())
		output_mp3.close()

		file_name = f.readline().strip()
		file_ogg = f.readline().strip()
		file_mp3 = f.readline().strip()
		print 'Done:', file_name

	print 'Finished'
	f.close()


if __name__ == '__main__':
	main()