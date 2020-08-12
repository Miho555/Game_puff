# 8.11　なんじゃもんじゃ
import numpy as np
import cv2 as cv

#画像読み込み
img = cv2.imread('./boy_question.png')


cap = cv.VideoCapture(0)
if not cap.isOpened():
  print("Cannot open camera")
  exit(1)

while True:
  # Capture frame-by-frame
  ret, frame = cap.read()
  # if frame is read correctly ret is True
  if not ret:
    print("Can't receive frame (stream end?). Exiting ...")
    break
  # Our operations on the frame come here
  gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
  # Display the resulting frame
  cv.imshow('frame', gray)
  if cv.waitKey(1) == ord('q'):
    break

# When everything done, release the capture
cap.release()
cv.destroyAllWindows()

#def main():	
#if __name__ == '__main__':
#	main()